
import { useState,useEffect } from 'react';
import { Checkbox } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

function TodoList(){
    //toDoData
    const [ todoData, setTodoData ] = useState([//資料內容
        { id:1, thing: "deliever resume", done: true },
        { id:2, thing: "play vollleyball game", done: false },
        { id:3, thing: "coding", done: false },
        { id:4, thing: "play pinao", done: true },
    ]);
    const [isDoneMode,setDoneMode]=useState(false);//切換完成/未完成優先序
    const [progress,setProgress] = useState(0) //上方進度條
    const [inputThings,setInputThings] = useState('')
    //handle functioon
    
    function handleAddThings(){//增加任務
        setTodoData([
            ...todoData,
            {
                id:todoData.length+1,
                thing:inputThings,
                done:false
            }
          ])
    }

    function handleDoneChange(doneKey:any){//切換checkbox
        setTodoData((todoData) =>
            todoData.map((todo) => todo.id === doneKey ? { ...todo, done: !todo.done } : todo))//找到對應的物件並修改值
    }

    function handleDelete(deleteKey:any){//刪除任務
        setTodoData(todoData.filter((_, i) => i+1 !== deleteKey))//在todoData中保留 所刪除內容以外的

    }

    function handleMoveDone(){//優先序切換
        if(!isDoneMode){
            const doneArray = todoData.filter(data => data.done === true);//已完成任務
            const undoneArrary = todoData.filter(data => data.done === false);//未完成任務
            const MoveDone = [...doneArray,...undoneArrary]
            setTodoData(MoveDone);
            setDoneMode(true);
        }else{
            const originData = []
            for(let x=1;x<=100;x++){//依id(建立次序)進行排列
                const addObj = todoData.filter(data => data.id === x)
                originData.push(...addObj);
            }
            setTodoData(originData);
            setDoneMode(false)
        }

    }


    useEffect(() => {//重新統計完成度
            const doneArray = todoData.filter(data => data.done === true);
            setProgress(Math.round((Number(doneArray.length)/Number(todoData.length))*100))
      });



    //components function
    function Todo_things(item:any){//中間每個任務
        return(
            
            <div className='w-full h-[80px] rounded-[6px] bg-white mb-4 border-l-[6px] border-[#97a2df] flex'>  
            <div className='pt-[15px] px-3 '>
                <Checkbox 
                checked={item.done} 
                onChange={()=>{handleDoneChange(item.id)}}
                sx={{color:'#7c8ad8','&.Mui-checked': {color:'#7c8ad8'},'& .MuiSvgIcon-root': { fontSize: 30 }}}
                />
            </div>
            <div className='w-full'>
                <span className={clsx('leading-[75px] text-[#7683cf] text-[20px]',{'line-through':item.done })}>{item.things}</span>
            </div>
            <div className='pt-[26px] px-5'>
                <CloseIcon onClick={()=>{handleDelete(item.id)}} className='text-[#98a1d3] text-[10px] cursor-pointer'/>
            </div>
            </div>
        )
    }

    //main content for export to App.js
    return(
        <div className=' items-center pt-14 justify-center frontend_bg px-10'>
            <div className=' container max-w-[940px] mx-auto px-6 '>
                <div className='border-b-2 border-[#97a2df] pt-[50px]'>
                    <div className='text-[#6877c9] text-[30px] leading-8 mb-2'>Todo List</div>
                    <div className='text-[#8b97da] text-[15px] mb-2'>Add things to do</div>
                </div>
                <div className='flex my-5'>
                    <div className='mr-[15px] text-[#7780b3] w-[10%]'>{progress}%</div>
                    <div className='w-full bg-white flex rounded-2xl my-1'>
                        <div  style={{ width: `${progress}%` }} className='bg-[#97a2df] rounded-2xl'></div>
                    </div>
                </div>
            </div>
                <div className='h-[500px] overflow-auto'>
                <div className=' container max-w-[940px] mx-auto px-4 '>
                    {
                        todoData.map((item,index) => (
                            <Todo_things key={index} id={item.id} things={item.thing} done={item.done}/>
                        ))
                    }

                </div>

                </div>
             <div className=' container max-w-[940px] mx-auto px-4 '>
                <div className='border-t-2 border-[#97a2df] mt-3 text-right text-[#8692d3] py-3'>
                    <div className='flex content-end'>
                        <div className='pr-2 w-full'>Move done things to end?</div>
                        <label className="inline-flex relative items-center mr-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                readOnly
                            />
                            <div
                                onClick = {() => {
                                    handleMoveDone();
                                }}
                                className="w-11 h-6 bg-white rounded-full peer peer-focus:ring-[#adb2d4]  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#97a2df] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#97a2df]"
                            ></div>
                        </label>
                    </div>
                </div>

                <div className='text-[#909bda] text-[20px] mb-2'>Add to list</div>
                <form className='flex'>
                    <input id='Input' className='w-full rounded p-2' onChange={(e)=>setInputThings(e.target.value)}></input>
                    <button type='reset' className='h-100 w-12 ml-2 bg-[#7c8ad8] text-white rounded leading-10 text-2xl' onClick={() => {handleAddThings();}}>
                        <div className='mt-[-3px] mb-[3px]'>+</div>
                    </button>
                </form>
            </div>
        </div>
    )

}
export default TodoList;