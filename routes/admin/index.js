module.exports = app => {
	const express = require('express')
  const path = require('path')
  const fs = require('fs')
  const router = express.Router({
    mergeParams:true
  })

  // 创建资源
  router.post('/',async (req,res) =>{
  	const model = await req.Model.create(req.body)
  	res.send(model)
  })
  router.get('/',async (req,res) => {
    const queryOptions = {}
    if(req.modelName === 'Category'){
      queryOptions.sort = {_id:-1}
      queryOptions.limit = Number(20)
      queryOptions.populate = 'parent'
    }
    const model = await req.Model.find().setOptions(queryOptions);
    res.send(model)
  })
  router.get('/:id',async (req,res) => {
    const queryOptions = {
      sort:{_id:-1},
      limit:Number(20),
      populate:'parent'
    }
    const model = await req.Model.findById(req.params.id).setOptions(queryOptions);
    res.send(model)
  })
  // router.get('/getparent',async (req,res) => {
  //   res.send(1)
  // })
  // 更新资源
  router.put('/:id',async (req,res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.delete('/:id',async (req,res) => {
    if(req.modelName === 'Commodity'){
     let model = await req.Model.findById(req.params.id).select('file');
     let dir = path.resolve(__dirname,'../../uploads/');
     console.log(dir)
     let reg = /(\S*uploads)/g
     let result = model.file.replace(reg,dir)
     fs.unlink(result, () => {
      // console.log(result)
      console.log('删除成功')
    })
   }
   await req.Model.findByIdAndDelete(req.params.id)
   res.send({
    success:true
  })
 })

  const resourceMiddleware = require('../../middleware/resource')
  app.use('/admin/api/rest/:resource',resourceMiddleware(),router)


  const multer = require('multer')
  const storage =  multer.diskStorage({
    destination:function(req,file,cb){
      // './uploads'
      // __dirname + '/../../uploads'
      // cb(null, 'D:/Web/Project/server/uploads')
      let dir = path.resolve(__dirname,'../../uploads');
      cb(null,dir)
    },
    filename:function(req,file,cb){
      cb(null,Date.now() + '-' + file.originalname)
    }
  })
  const upload = multer({
    storage,
    limits:{fileSize:1024*1024*2},
    fileFilter:function(req,file,cb){
      cb(null,true)
    }
  })
  app.post('/admin/api/upload',upload.single('file'),(req,res) => {
    const file = req.file
    res.send(file)
  })
}