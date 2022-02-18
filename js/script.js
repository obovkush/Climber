window.addEventListener('DOMContentLoaded', function(event) {

  // Add dialog polyfill
  var dialog = document.querySelector('dialog')
  dialogPolyfill.registerDialog(dialog)
  // Now dialog always acts like a native <dialog>.
  
  dialog.style.backgroundColor = "transparent"
  dialog.style.border = "none"
  dialog.showModal()

  //Button close dialog
  let closeBtn = document.querySelector('#close')
  closeBtn.onclick = function() {
    dialog.close()
    location.reload()
  }
  closeBtn.style.display = "none"

  //Message in dialog
  let message = document.querySelector('#message')
  message.style.color = 'yellow'

  //Start count
  let ticks = 4
  let letsGo = setInterval(function() {
    
    if(ticks > 0) {
      ticks--
      if(ticks === 0) {
        message.style.color = 'lime'
        message.innerText = 'Start'
      } else message.innerText = ticks

    } else {
        clearInterval(letsGo);
        dialog.close() 
    }
  }, 1000)

  //Points to climb
  const points = document.querySelectorAll('.point')
  const man = document.querySelector('.man')
  points[0].appendChild(man)

  //Win flag
  const flag = document.createElement('img')
  flag.src = "img/win.gif"
  flag.style.cssText = `
    width: 200%;
    position: absolute;
    bottom: 0;
    right: 5%;
    display: none;
  `
  points[points.length - 1].appendChild(flag)

  let currentPoint = 0
  let score = 0
  let scoreCount = document.querySelector('#score-count')

  //Keyboard listener
  document.addEventListener('keydown', function(event) {
    event.preventDefault()

    if(!dialog.hasAttribute('open')) {

      if(event.code === 'KeyX' && currentPoint < points.length - 1) {
        currentPoint++
        points[currentPoint].appendChild(man)
        score += 100
        scoreCount.innerText = score
      }
      if(event.code === 'KeyZ' && currentPoint > 0) {
        currentPoint--
        points[currentPoint].appendChild(man)
        score -= 100
        scoreCount.innerText = score
      }
      if(currentPoint === points.length - 1) {
        flag.style.display = "block"
        
        closeBtn.style.display = "inline-block"
        message.style.color = "limegreen"
        message.innerText = "Ты выиграл!"

        dialog.showModal()
      } 
      else flag.style.display = "none"

    }

  })

  //Eagles
  const area = document.querySelector('.container')
  
  //Node eagle
  const eagle = document.createElement('div')
  eagle.style.cssText = `
    width: 5%;
    position: absolute;
    top: 0;
    right: -10%;
    z-index: 11;
  `

  const eagleImg = document.createElement('img')
  eagleImg.src = "img/gray_eagle.gif"
  eagleImg.style.width = "100%"

  eagle.appendChild(eagleImg)
  area.appendChild(eagle)
  
  //Fly first eagle
  let startEagle = Date.now()
  let flyEagle = setInterval(function() {
    eagle.style.top = Math.random() * 70 + "%"
    let timePasse = Date.now() - startEagle

    stopFly(flyEagle, timePasse)

    let start = Date.now()
    let timer = setInterval(function() {
      
      let timePassed = Date.now() - start
        if (timePassed >= 5000) {
          clearInterval(timer)
          return
        }
        if(currentPoint !== points.length - 1) {
          if(timePassed < 2500) {
            flyLeft(timePassed)
          }
          if(timePassed >= 2500) {
            flyRight(timePassed)
          }
        }

        //Coordinates of man
        let manX = man.getBoundingClientRect().left
        let manW = man.getBoundingClientRect().width
        let manY = man.getBoundingClientRect().top
        let manH = man.getBoundingClientRect().height

        //Coordinates of eagle
        let eagleX = eagle.getBoundingClientRect().left
        let eagleW = eagle.getBoundingClientRect().width
        let eagleXM = eagleX + eagleW / 2
        let eagleY = eagle.getBoundingClientRect().top
        let eagleH = eagle.getBoundingClientRect().height
        let eagleYM = eagleY + eagleH / 2
        if((eagleXM >= manX + manW / 3 && eagleXM <= manX + 2 * manW / 3) 
          && (eagleYM >= manY && eagleYM <= manY + manH)) {
          man.style.cssText = `
            width: 50%;
            top: 40%;
            transform: scale(1, -1);
          `
          eagle.appendChild(man)
          scoreCount.innerText = 0
          closeBtn.style.display = "inline-block"
          dialog.style.borderColor = "red"
          message.style.color = "red"
          message.innerText = "Ты проиграл!"
          dialog.showModal()
        } 

    }, 25)
  }, 5000)

  function flyLeft(timePassed) {
    eagle.style.transform = "scale(1, 1)"
    eagle.style.right = (timePassed * 0.95 / 25) + '%';
  }

  function flyRight(timePassed) {
    eagle.style.transform = "scale(-1, 1)"
    eagle.style.right = ( (5000 - timePassed) * 0.95/ 25) + '%';
  }

  //Eagle2
  const eagle2 = eagle.cloneNode(true)

  area.appendChild(eagle2)

  let flyEagle2 = setInterval(function() {
    eagle2.style.top = Math.random() * 70 + "%"
    let timePasse = Date.now() - startEagle

    stopFly(flyEagle2, timePasse)

    let start = Date.now()
    let timer = setInterval(function() {
      
      let timePassed = Date.now() - start
        if (timePassed >= 5000) {
          clearInterval(timer)
          return
        }
        if(currentPoint !== points.length - 1) {
          if(timePassed < 2500) {
            flyRight2(timePassed)
          }
          if(timePassed >= 2500) {
            flyLeft2(timePassed)
          }
        }
        //Coordinates of man
        let manX = man.getBoundingClientRect().left
        let manW = man.getBoundingClientRect().width
        let manY = man.getBoundingClientRect().top
        let manH = man.getBoundingClientRect().height

        //Coordinates of eagle
        let eagle2X = eagle2.getBoundingClientRect().left
        let eagle2W = eagle2.getBoundingClientRect().width
        let eagle2XM = eagle2X + eagle2W / 2
        let eagle2Y = eagle2.getBoundingClientRect().top
        let eagle2H = eagle2.getBoundingClientRect().height
        let eagle2YM = eagle2Y + eagle2H / 2
        if((eagle2XM >= manX + manW / 3 && eagle2XM <= manX + 2 * manW / 3) 
          && (eagle2YM >= manY && eagle2YM <= manY + manH)) {
          man.style.cssText = `
            width: 50%;
            top: 40%;
            transform: scale(1, -1);
          `
          eagle2.appendChild(man)
          scoreCount.innerText = 0
          closeBtn.style.display = "inline-block"
          dialog.style.borderColor = "red"
          message.style.color = "red"
          message.innerText = "Ты проиграл!"
          dialog.showModal()
        } 

    }, 25)
  }, 5000)

  function flyLeft2(timePassed) {
    eagle2.style.transform = "scale(1, 1)"
    eagle2.style.right = ( (timePassed - 2500) * 0.95 / 25 ) + '%';
  }

  function flyRight2(timePassed) {
    eagle2.style.transform = "scale(-1, 1)"
    eagle2.style.right = (95 - timePassed * 0.95 / 25) + '%';
  }

  //Eagle3

  const eagle3 = eagle.cloneNode(true)
    eagle3.style.cssText = `
      width: 10%;
      position: absolute;
      top: 0;
      right: 120%;
      z-index: 11;
    `
    eagle3.innerHTML = `<img src="img/eagle.gif" style="width: 100%;">`
    
    area.appendChild(eagle3)

  //Start eagle3 with timeout
  const timer3 = setTimeout(function() {
    
    // let startEagle3 = Date.now()
    let flyEagle3 = setInterval(function() {
      eagle3.style.top = Math.random() * 70 + "%"
      let timePasse = Date.now() - startEagle

      stopFly(flyEagle3, timePasse)

      let start = Date.now()
      let timer = setInterval(function() {
        
        let timePassed = Date.now() - start
          if (timePassed >= 5000) {
            clearInterval(timer)
            return
          }
          if(currentPoint !== points.length - 1) {
            if(timePassed < 2500) {
              flyRight3(timePassed)
            }
            if(timePassed >= 2500) {
              flyLeft3(timePassed)
            }
          }

          //Coordinates of man
          let manX = man.getBoundingClientRect().left
          let manW = man.getBoundingClientRect().width
          let manY = man.getBoundingClientRect().top
          let manH = man.getBoundingClientRect().height

          //Coordinates of eagle
          let eagle3X = eagle3.getBoundingClientRect().left
          let eagle3W = eagle3.getBoundingClientRect().width
          let eagle3XM = eagle3X + eagle3W / 2
          let eagle3Y = eagle3.getBoundingClientRect().top
          let eagle3H = eagle3.getBoundingClientRect().height
          let eagle3YM = eagle3Y + eagle3H / 2
          if((eagle3XM >= manX + manW / 3 && eagle3XM <= manX + 2 * manW / 3) 
            && (eagle3YM >= manY - manH  && eagle3YM <= manY + 2 * manH)) {
            man.style.cssText = `
              width: 25%;
              top: 45%;
              transform: scale(1, -1);
            `
            eagle3.appendChild(man)
            scoreCount.innerText = 0
            closeBtn.style.display = "inline-block"
            dialog.style.borderColor = "red"
            message.style.color = "red"
            message.innerText = "Ты проиграл!"
            dialog.showModal()
          } 

      }, 25)
    }, 5000)

    function flyLeft3(timePassed) {
      eagle3.style.transform = "scale(1, 1)"
      eagle3.style.right = ( (timePassed - 2500) * 0.9 / 25 ) + '%';
    }

    function flyRight3(timePassed) {
      eagle3.style.transform = "scale(-1, 1)"
      eagle3.style.right = (90 - timePassed * 0.9 / 25) + '%';
    }
  }, 1250)

  //Stop flying after time limit
  function stopFly(fly, timePasse) {
    if(timePasse >= 30000) {
      clearInterval(fly)
    
      if(!dialog.hasAttribute('open')) {
        message.style.color = 'red'
        message.innerText = 'Орёл устал!'
        closeBtn.style.display = 'inline-block'
        dialog.showModal()
      }
      return
    }
  }

})
