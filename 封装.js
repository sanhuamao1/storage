//定义sessionStorage的key为'mall'
const STORAGE_KEY='mall';

export default{
    // 在sessionStorage的key下新建value
    setItem(key,value,module_name){
        if(module_name){
             //1.如果传了模块，先把模块内的值取出来，比如user模块
            let val=this.getItem(module_name)
            //2.在模块内添加值
            val[key]=value
            this.setItem(module_name,val)
        }else{
            //1.如果没有传模块，直接在sessionstorage中的key里添加（这里是mall里）
            let val=this.getStorage();
            val[key]=value
            window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
        }
    },

    // 从sessionStorage中的key中获取值
    getItem(module_name,key){
        if(module_name){
            //若传入模块名称，先获取该模块下的所有数据，并获取里面的key
            let val=this.getItem(module_name)
            if(val) return val[key]
        }
        //若没有传入模块名称，直接获取sessionStorage中的key里面的属性（这里是mall下面的某一属性）
        return this.getStorage()[key]
    },

    //获取sessionStorage的key，这里指明mall
    getStorage(){
        //将json格式转变为对象
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)||'{}')
    },

    //删除sessionStorage的key
    clear(key,module_name){
        let val=this.getStorage();
        if(module_name){
            if(!val[module_name]) return;
            //若传入了模块名称，删除模块里面的key
            delete val[module_name][key]
        }else{
            //若没有传入模块名称，删除sessionStorage的key里的key
            delete val[key]
        }
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val))
    }
}
