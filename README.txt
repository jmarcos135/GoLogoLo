TESTING QUERIES: 

Queries:
	users
	user(id)
Mutations:
	addUser(...)
	addLogo(...)
	updateLogo(...)
	removeLogo(...)
	removeAllUsers
	


// query all users and display user data
{
  users {
    _id
  	email
    password
    logos{
      _id
      name
      textBoxes{
        _id
      }
      imageBoxes{
        _id
      }
    }
  }
}
=============================
//query specific user
{
  user(id:"5eb5cad4b21273104270b719") {
    _id
    email
    password
    logos{
      _id
    }
  }
}

{
  user(id:"5ebc3e37ffbda00ce3d1d399") {
    _id
    email
    password
    logos{
      _id
      name
      textBoxes{
        _id
        text
        fontSize
        color
        width
        height
      }
      imageBoxes{
        _id
        url
        width
        height
      }
    }
  }
}


===========================
// update logo
mutation {
  updateLogo(
	userId:"5eb5cad4b21273104270b719",
	logoId:"5eb602a2f42c601722ec59e3",
	name: "qwer",
	width: 10,
	height: 10,
	backgroundColor: "qwer",
	borderColor: "qwer",
	borderRadius: 12,
	borderWidth: 11,
	textBoxes: [],
	imageBoxes: [],
  ){
    _id
  }

}

mutation {
  updateLogo(
	userId:"5ebc3e37ffbda00ce3d1d399",
	logoId:"5ebc3e78ffbda00ce3d1d39c",
	name: "second logo",
	width: 10,
	height: 10,
	backgroundColor: "qwer",
	borderColor: "qwer",
	borderRadius: 12,
	borderWidth: 11,
	textBoxes: [{text:"first text", fontSize: 22, color:"#ffffff", width:100, height:100}],
	imageBoxes: [{url:"firstimageurl", width:100, height:100}],
  ){
    _id
  }

}

==========================
// add logo to specific user
mutation {
  addLogo(
	userId:"5eb5cad4b21273104270b719",
	name: "qwer",
	width: 10,
	height: 10,
	backgroundColor: "qwer",
	borderColor: "qwer",
	borderRadius: 12,
	borderWidth: 11,
	textBoxes: [],
	imageBoxes: [],
  ){
    _id
  }
}
=========================
// remove specific user logo
mutation {
  removeLogo(
    userId:"5eb5cad4b21273104270b719",
    logoId:"5eb602a2f42c601722ec59e3"
  ){
    _id
  }
}
=========================
// add user
mutation {
  addUser(
    email: "qwer",
  	password: "qwer",
  ){
    _id
  }
}
=========================
// remove all users 
mutation {
  removeAllUsers
  {
    _id
  }
}

