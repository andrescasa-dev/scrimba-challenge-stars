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
    return`<div class="star" style="right: ${this.x + 35}px; bottom: ${this.y + 28}px; --scale-duration:${random}s">
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
    
    this.ringsQuantity = 7;
    //al the numbers has to be multiple of 2
    this.ringGap = 80;
    this.initialMagnitude = 40; //also the ring radius+
    this.magnitude = this.initialMagnitude; 
    this.starCoefficientList = [1/20,1/18,1/16,1/14,1/12,1/10,1/8];
    this.starCoefficientIndex = 3;
    this.starCoefficient = this.starCoefficientList[this.starCoefficientIndex]

    this.addEventListeners();
    this.loadUniverse();
  }

  addEventListeners(){
    this.$moreBtn.addEventListener('click',()=>{
      const index = (this.starCoefficientIndex < this.starCoefficientList.length - 1) ? ++this.starCoefficientIndex : this.starCoefficientIndex;
      this.starCoefficient = this.starCoefficientList[index];
      this.loadUniverse();
    })

    this.$lessBtn.addEventListener('click',()=>{
      const index = this.starCoefficientIndex > 0 ? --this.starCoefficientIndex : this.starCoefficientIndex;
      this.starCoefficient = this.starCoefficientList[index]
      this.loadUniverse();
    })
  }

  loadUniverse(){
    this.starSystems = new Array(this.ringsQuantity).fill(0).map(slot =>{
      const distance = Math.round(360 / ( this.magnitude * this.starCoefficient));
      const newSystem = this.createSystem(distance, this.magnitude)
      this.magnitude += this.ringGap;
      return newSystem
    })
    this.magnitude = this.initialMagnitude;
    this.$counter.innerHTML = this.starSystems.reduce((acc, system)=> acc + system.length,0) + " stars"
    this.displaySystems(this.starSystems);
  }
  createSystem(distance, magnitude){
    let stars = [];
    let length = 0;
    while(length < 360){
      length += distance;
      const newStar = new Star({ angle: length, magnitude})
      stars.push(newStar);
    }
    return stars;
  }

  displaySystems(systemsList){
    const fragment = new DocumentFragment();
    systemsList.forEach((starSystem,i) => {
      const divSystem = document.createElement('div');
      if( (i % 2) !== 0 ) divSystem.classList.add('reverseAnimation');
      divSystem.classList.add('starSystem', 'rotating')
      //20 y 30
      const randomPeriod = Math.floor(Math.random() * (51 - 20) + 20);
      divSystem.style.setProperty('--period', `${randomPeriod}s`);
      divSystem.innerHTML = starSystem.reduce((html, star) => html + star.getHtml() ,'')
      fragment.appendChild(divSystem)
    });
    this.$universe.innerHTML = '';
    this.$universe.appendChild(fragment)
  }
}

new App();





