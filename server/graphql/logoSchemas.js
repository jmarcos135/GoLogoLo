var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo.js').Logo;
var UserModel = require('../models/User');


var textBoxType = new GraphQLObjectType({
    name: 'textBox',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            layerIndex: {
                type: GraphQLInt 
            },
            text: {
                type: GraphQLString
            },
            fontSize: {
                type: GraphQLInt 
            },
            color: {
                type: GraphQLString
            },
            x: {
                type: GraphQLInt
            },
            y: {
                type: GraphQLInt
            }
        }
    }
});

var textBoxInput= new GraphQLInputObjectType({
    name: 'textBoxInput',
    fields: {
        _id: {
            type: GraphQLString
        },
        layerIndex: {
            type: GraphQLInt 
        },
        text: {
            type: GraphQLString
        },
        fontSize: {
            type: GraphQLInt 
        },
        color: {
            type: GraphQLString
        },
        x: {
            type: GraphQLInt
        },
        y: {
            type: GraphQLInt
        }
    }
  });

var imageBoxType = new GraphQLObjectType({
    name: 'imageBox',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            layerIndex: {
                type: GraphQLInt 
            },
            url: {
                type: GraphQLString
            },
            width: {
                type: GraphQLInt 
            },
            height: {
                type: GraphQLInt 
            },
            x: {
                type: GraphQLInt
            },
            y: {
                type: GraphQLInt
            }
        }
    }
});

var imageBoxInput= new GraphQLInputObjectType({
    name: 'imageBoxInput',
    fields: {
        _id: {
            type: GraphQLString
        },
        layerIndex: {
            type: GraphQLInt 
        },
        url: {
            type: GraphQLString
        },
        width: {
            type: GraphQLInt 
        },
        height: {
            type: GraphQLInt 
        },
        x: {
            type: GraphQLInt
        },
        y: {
            type: GraphQLInt
        }
    }
  });

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            width: {
                type: GraphQLInt 
            },
            height: {
                type: GraphQLInt 
            },
            backgroundColor: {
                type: GraphQLString
            },
            borderColor: {
                type: GraphQLString
            },
            borderRadius: {
                type: GraphQLInt
            },
            borderWidth: {
                type: GraphQLInt
            },
            textBoxes: {
                type : new GraphQLList(textBoxType)
            },
            imageBoxes: {
                type : new GraphQLList(imageBoxType)
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

var userType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            email: {
                type: GraphQLString
            },
            password: {
                type: GraphQLString 
            },
            logos: {
                type: new GraphQLList(logoType)
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            users: {
                type: new GraphQLList(userType),
                resolve: function () {
                    const users = UserModel.find().exec()
                    if (!users) {
                        throw new Error('Error')
                    }
                    return users 
                }
            },
            user: {
                type: userType,
                args:{
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const user = UserModel.findById(params.id).exec();
                    if (!user) {
                        throw new Error('Error')
                    }
                    return user
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addUser: {
                type: userType,
                args: {
                    email: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    password: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    const userModel = new UserModel(params);
                    const newUser = userModel.save();
                    if (!newUser) {
                        throw new Error('Error');
                    }
                    return newUser 
                }
            },
            addLogo: {
                type: logoType,
                args: {
                    userId: { 
                        name: "_id",
                        type: GraphQLString
                    },
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    textBoxes: {
                        type: new GraphQLList(textBoxInput)
                    },
                    imageBoxes: {
                        type: new GraphQLList(imageBoxInput)
                    }
                },
                resolve: function (root, params) {
                    const user = UserModel.findOne({_id: params.userId}, function (err, user){
                        if (err) console.log(err);
                        user.logos.push({name: params.name, width: params.width, height: params.height, backgroundColor: params.backgroundColor, borderColor: params.borderColor,
                                            borderRadius: params.borderRadius, borderWidth: params.borderWidth, textBoxes: params.textBoxes, imageBoxes: params.imageBoxes});
                        user.save(function(err, user) {
                            if(err) return next(err);
                            //res.send(user);
                        })
                    });
                    if (!user) {
                        throw new Error('Error')
                    }
                    return user
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    userId: {
                        name: '_id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    logoId: {
                        name: '_id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    width: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    height: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    backgroundColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderWidth: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    textBoxes: {
                        type: new GraphQLList(textBoxInput)
                    },
                    imageBoxes: {
                        type: new GraphQLList(imageBoxInput)
                    }
                },
                resolve: function (root, params) {
                    return UserModel.findOneAndUpdate(
                        {_id: params.userId, "logos._id": params.logoId},
                        {
                            "$set": {
                                "logos.$.name": params.name,
                                "logos.$.width": params.width, 
                                "logos.$.height": params.height, 
                                "logos.$.backgroundColor": params.backgroundColor, 
                                "logos.$.borderColor": params.borderColor,
                                "logos.$.borderRadius": params.borderRadius,
                                "logos.$.borderWidth": params.borderWidth,
                                "logos.$.textBoxes": params.textBoxes,
                                "logos.$.imageBoxes": params.imageBoxes,
                                "logos.$.lastUpdate": new Date() 
                            }
                        });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    userId: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    logoId: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const user = UserModel.findOne({_id: params.userId}, function (err, user){
                        if (err) console.log(err);
                        user.logos.id(params.logoId).remove();
                        user.save(function(err, user) {
                            if(err) return next(err);
                            //res.send(user);
                        })
                    });
                    if (!user) {
                        throw new Error('Error')
                    }
                    return user
                }
            },
            removeAllUsers: {
                type: new GraphQLList(userType),
                resolve: function (root, params) {
                    const remUsers= UserModel.find().exec();
                    UserModel.deleteMany({}).exec();
                    if (!remUsers) {
                        throw new Error('Error');
                    }
                    return remUsers;
                }
            },
            removeAllLogos: {
                type: new GraphQLList(logoType),
                args: {
                },
                resolve(root, params) {
                    //const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    //const remLogo = LogoModel.deleteMany({});
                    const remLogos = LogoModel.find().exec();
                    LogoModel.deleteMany({}).exec();
                    if (!remLogos) {
                        throw new Error('Error')
                    }
                    return remLogos;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });