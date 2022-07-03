    const set= document.querySelector('button#set')
    const stop= document.querySelector('p#stop')
    const Reset= document.querySelector('p#reset')
    const startORpause= document.querySelector('p#sorp')
    const time= document.querySelector('.time div')
    const timeName= document.querySelector('.timer div span')
    const input= document.querySelectorAll('input')
    const runValue=document.querySelectorAll('.time p') 


    set.addEventListener('click',e=>{
        input.forEach(i=>{
            i.classList.toggle('edit')
            i.toggleAttribute('disabled')
            if(!i.hasAttribute('disabled')){
                i.value=''
            }
        })
        if (input[0].hasAttribute('disabled')){
            for (i=0; i<input.length; i++){
                if(input[i].value.length==0||input[i].value==0){
                    input[i].value='00'
                }
                runValue[i].textContent= input[i].value.padStart(2,'0')
            }
        }
        if(input[0].value.length==0){
            input[0].focus()
        }
    })

   input.forEach(i=>{
        i.onfocus=()=>{
            if(!i.hasAttribute('disabled')){
                i.value=''
            }
        }
   })

    function moveon(num){
        const target = input[num]
        let ivalue= target.value.length
        let nextInputIndex = input[num+1]
        let noIndex = input[4]

        if(ivalue<2){
            target.addEventListener('keypress',e=>{
                if (e.key === "Enter"){
                    nextInputIndex.focus()
                }else removeEventListener('keypress', undefined)
            })
        }
        if (ivalue==2 && nextInputIndex!=noIndex){
            console.log('yipeeeeeee')
            nextInputIndex.focus()
        } else if(ivalue==2 && nextInputIndex==noIndex){

        set.focus()            
        }
        return
    }

    startORpause.addEventListener('click',e=>{

        startORpause.classList.toggle('running')
        // if(startORpause.classList.contains('running')){

            let dayValue = runValue[0].textContent*86400000
            let hourValue = runValue[1].textContent*3600000
            let minuteValue = runValue[2].textContent*60000
            let secondValue = runValue[3].textContent*1000
            const allValue = dayValue+hourValue+minuteValue+secondValue
            const present = new Date().getTime()
            const future = new Date(present + allValue)

            
            if(allValue!=0){    
            let counter = setInterval(()=>{ 
                const now = new Date()
                const countDownTime = future.getTime()- now.getTime()
                const seconds = 1000;
                const minutes = seconds*60 ;
                const hours = minutes* 60;
                const days = hours *24; 
            
                const day =Math.floor(countDownTime/days)
                const hour =Math.floor((countDownTime%days)/hours)
                const minute =Math.floor((countDownTime%hours)/minutes)
                const second =Math.floor((countDownTime%minutes)/seconds);
            
                runValue[0].textContent=day.toString().padStart(2,'0')
                runValue[1].textContent=hour.toString().padStart(2,'0')
                runValue[2].textContent=minute.toString().padStart(2,'0')
                runValue[3].textContent=second.toString().padStart(2,'0')

                if (countDownTime!=0 && !startORpause.classList.contains('running')){
                    clearInterval(counter)
                    second++
                }
                else if (countDownTime<=0){
                    runValue[0].textContent='00'
                    runValue[1].textContent='00'
                    runValue[2].textContent='00'
                    runValue[3].textContent='00'
                    clearInterval(counter)
                }
            },1000)
            } else {
               set.focus()
            }
       
    })