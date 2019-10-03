module.exports = app => {
	const express = require('express')
	const router = express.Router({
		mergeParams:true
	})

	const Category = require('../../models/Category')

  router.post('/',async (req,res) =>{
  	const model = await Category.create(req.body)
  	res.send(model)
  })
  router.get('/',async (req,res) => {
    const model = await Category.find();
    res.send(model)
  })
  router.get('/:id',async (req,res) => {
  	const model = await Category.findById(req.params.id);
  	res.send(model)
  })
  router.put('/:id',async (req,res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
  })
  router.delete('/:id',async (req,res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.send({
      success:true
    })
  })

	app.use('/admin/api/rest/:resource',router)
}