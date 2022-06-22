class Star{
  constructor(data){
    Object.assign(this, data);
  }
  get x(){
    return Math.sin(this.angle * (Math.PI / 180)) * this.magnitude;
  }
  get y(){
    return Math.cos(this.angle * (Math.PI / 180)) * this.magnitude;
  }
  getHtml(){
    const random = Math.floor(Math.random() * (3 - 1) + 1);
    return`<div class="star" style="right: calc(${this.x}px + 2.4em) ; bottom: calc(${this.y}px + 2.4em) ; --scale-duration:${random}s">
            <img src="https://cdn-icons-png.flaticon.com/512/616/616490.png" alt="star">
          </div>`
  }
}

class App{
  constructor(){
    this.$universe = document.querySelector('#universe');
    this.$counter = document.querySelector('#counter');
    this.$moreBtn = document.querySelector('#more');
    this.$lessBtn = document.querySelector('#less');

    this.addEventListeners();
    
    //al the numbers has to be multiple of 2
    this.ringGap = 40;
    this.INITMAGNITUD = 40; //also the ring radius+
    this.magnitude = this.INITMAGNITUD; 
    this.starCoefficient = 0;
    
    this.starCount = 0;
    this.starSystems = [];
    this.loadNewStarSystem();
    this.displayStarsNumber();
  }

  addEventListeners(){
    this.$moreBtn.addEventListener('click',(e)=>{
      this.starCoefficient++;
      this.loadAllStarSystems();
      this.displayStarsNumber();
    })

    this.$lessBtn.addEventListener('click',(e)=>{
      if(this.starCoefficient > 0) this.starCoefficient--;
      this.loadAllStarSystems();
      this.displayStarsNumber();
    })

    document.body.addEventListener('keypress',(event)=>{
      if(event.key === 'ArrowRight' || event.key === 'd'){
        this.loadNewStarSystem();
        this.displayStarsNumber();
      }
      if(event.key === 'ArrowLeft' || event.key === 'a'){
        if(this.starSystems.length > 1){
          this.deleteLastStarSystem();
          this.displayStarsNumber();
        } 
      }
    });
  }

  loadAllStarSystems(){
    this.magnitude = this.INITMAGNITUD;
    this.starCount = 0;
    this.starSystems = this.starSystems.map(slot =>{
      const distance = 360/((this.magnitude/20) + (2 * this.starCoefficient));
      const newSystem = this.createSystem(distance, this.magnitude)
      this.magnitude += this.ringGap;
      return newSystem
    })
    debugger;
    this.displaySystems(this.starSystems);
  }

  displayStarsNumber(){
    this.$counter.innerHTML = this.starCount + " stars"
  }

  loadNewStarSystem(){
    const distance = 360/((this.magnitude/20) + (2 * this.starCoefficient));
    const newSystem = this.createSystem(distance, this.magnitude)
    this.starSystems.push(newSystem);
    this.displaySystem(newSystem);
    this.magnitude += this.ringGap;
  }

  deleteLastStarSystem(){
    const lastStarSystem = this.starSystems.pop();
    this.starCount -= lastStarSystem.length;
    this.magnitude -= this.ringGap;
    this.$universe.removeChild(this.$universe.lastChild)
  }

  createSystem(distance, magnitude){
    let stars = [];
    let length = 0;
    while(length < 360){
      length += distance;
      const newStar = new Star({ angle: length, magnitude})
      stars.push(newStar);
      this.starCount++;
    }
    return stars;
  }

  displaySystems(systemsList){
    const fragment = new DocumentFragment();
    systemsList.forEach((starSystem,i) => {
      const divSystem = document.createElement('div');
      if( (i % 2) !== 0 ) divSystem.classList.add('reverseAnimation');
      divSystem.classList.add('starSystem', 'rotating')
      const randomPeriod = Math.floor(Math.random() * (51 - 20) + 20);
      divSystem.style.setProperty('--period', `${randomPeriod}s`);
      divSystem.innerHTML = starSystem.reduce((html, star) => html + star.getHtml() ,'')
      fragment.appendChild(divSystem)
    });
    this.$universe.innerHTML = '';
    this.$universe.appendChild(fragment)
  }

  displaySystem(starSystem){
    const divSystem = document.createElement('div');
    if( (this.starSystems.length % 2) !== 0 ) divSystem.classList.add('reverseAnimation');
    divSystem.classList.add('starSystem', 'rotating')
    const randomPeriod = Math.floor(Math.random() * (51 - 20) + 20);
    divSystem.style.setProperty('--period', `${randomPeriod}s`);
    divSystem.innerHTML = starSystem.reduce((html, star) => html + star.getHtml() ,'')
    this.$universe.appendChild(divSystem)
  }
}
new App();
