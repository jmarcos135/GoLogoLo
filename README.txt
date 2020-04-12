EXAMPLE QUERIES: 
** NOTE: replace SOME_LOGO_ID with a valid logo id.

mutation {
  addLogo(
    text: "test Logo",
    color: "#a8b5ff",
    fontSize: 42,
    backgroundColor: "#cc91ca",
    borderColor: "#441114",
    borderRadius: 32,
    borderWidth: 21,
    padding: 9,
    margins: 50
  ){
    _id
  }
}

=============================

{
  logo(id: "SOME_LOGO_ID") {
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margins
    lastUpdate
  }
}

============================

{
  logos {
    _id
    text
    color
    fontSize
    backgroundColor
    borderColor
    borderRadius
    borderWidth
    padding
    margins
    lastUpdate
  }
}

============================

mutation {
  updateLogo(
    id: "SOME_LOGO_ID",
    text: "newText",
    color: "ff33dd",
    fontSize: 20,
    backgroundColor:"ffffff",
    borderColor:"ffffff",
    borderRadius:15,
    borderWidth: 20,
    padding: 25,
    margins: 20
  ){
   _id
   text
   color
   fontSize
   backgroundColor
   borderColor
   borderRadius
   borderWidth
   padding
   margins
   lastUpdate
  }
}

============================

mutation {
  removeLogo(
    id:"SOME_LOGO_ID"
  ){
    _id,
    text
  }
}




