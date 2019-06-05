'use strict'

var expect = require('chai').expect
var MongoClient = require('mongodb')
var ObjectId = require('mongodb').ObjectID

const CONNECTION_STRING = process.env.DB

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project
      var searchQuery = req.query
      if(searchQuery._id) searchQuery._id = new ObjectId(searchQuery._id)
      if(searchQuery.open) searchQuery.open = String(searchQuery.open) == "true"
      MongoClient.connect(CONNECTION_STRING, function(err, db) {
        db.collection(project)
          .find(searchQuery)
          .toArray()
          .then(docs => res.json(docs))
          .catch(err => console.error(err))
      })
    })
    
    .post(function (req, res){
      var project = req.params.project
      var insertDoc = {
        issue_title: req.body.issue_title,
        issue_text: req.body.issue_text,
        created_by: req.body.created_by,
        created_on: new Date().toISOString(),
        updated_on: new Date().toISOString(),
        assigned_to: req.body.assigned_to || '',
        status_text: req.body.status_text || '',
        open: true
      }
      if(!insertDoc.issue_title || !insertDoc.issue_text || !insertDoc.created_by){
        res.status(400).json({err: 'Incomplete data'})
      }
      else{
        MongoClient.connect(CONNECTION_STRING, function(err, db) {
          db.collection(project)
            .insertOne(new Object(insertDoc))
            .then(doc => {
              insertDoc._id = doc.insertedId
              res.json(insertDoc)
            })
            .catch(err => console.error(err))
        })
      }
    })
    
    .put(function (req, res){
      var project = req.params.project
      var newDoc = req.body
      var _id = newDoc._id
      if(!_id) res.status(400).send('No issue ID supplied')
      delete newDoc._id
      
      for(var key in newDoc) if(newDoc[key] == undefined) delete newDoc[key]
      console.log('Got newDoc', newDoc)
      if(Object.keys(newDoc).length == 0) res.json({message: 'no updated field sent'})
      else{
        newDoc.updated_on = new Date().toISOString()
        MongoClient.connect(CONNECTION_STRING, function(err, db) {
          db.collection(project)
          .updateOne({_id: new ObjectId(_id)}, {$set: newDoc}, {new: true})
          .then(doc => {
            // console.log(doc)
            return res.json({message: 'successfully updated'})
          })
          .catch(err => res.json({message: 'could not update ' + _id})) 
        })
      }
    })
    
    .delete(function (req, res){
      var project = req.params.project
      var _id = req.body._id
      if(!_id) res.status(400).json({err: '_id error'})
      else
        MongoClient.connect(CONNECTION_STRING, function(err, db) {
          db.collection(project)
          .deleteOne({_id: new ObjectId(_id)})
          .then(obj => res.json({message: 'deleted ' + _id}))
          .catch(err => res.json({message: 'could not delete ' + _id}))
        })
    })   
}