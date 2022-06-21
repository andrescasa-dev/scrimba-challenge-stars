/* -------------------------------- Remember -------------------------------- */
/* * Think first: what is problem? and then, how can i solve it?
/* * Select the proper data structure (or if it doesn't need one)
/* -------------------------------- Remember -------------------------------- */


class Star{
  constructor(data){
    Object.assign(this, data);
  }
  get x(){
    return Math.sin(this.angle * (Math.PI / 180)) * this.magnitud;
  }
  get y(){
    return Math.cos(this.angle * (Math.PI / 180)) * this.magnitud;
  }
  getHtml(){
    return`<div class="star" style="right: ${this.x + 35}px; bottom: ${this.y + 28}px;">
            <img src="https://cdn-icons-png.flaticon.com/512/616/616490.png" alt="star">
          </div>`
  }
}

class App{
  constructor(){
    this.$universe = document.querySelector('#universe')
    this.$counter = document.querySelector('#counter')
  
    this.ringsQuantity = 7;
    this.ringGap = 80;
    this.magnitud = 50; //also the ring radius 

    this.starSystems = new Array(this.ringsQuantity).fill(0).map(slot =>{
      const distance = Math.round(360 / (0.1 * this.magnitud));
      const newSystem = this.createSystem(distance, this.magnitud)
      this.magnitud += this.ringGap;
      return newSystem
    })
    this.$counter.innerHTML = this.starSystems.reduce((acc, system)=> acc + system.length,0) + " stars"
    this.displaySystems(this.starSystems);
  }
  
  createSystem(distance, magnitud){
    let stars = [];
    let length = 0;
    while(length < 360){
      length += distance;
      const newStar = new Star({ angle: length, magnitud})
      stars.push(newStar);
    }
    return stars;
  }

  displaySystems(systemsList){
    const fragment = new DocumentFragment();
    systemsList.forEach((starSystem) => {
      const divSystem = document.createElement('div');
      divSystem.classList.add('starSystem', 'rotating')
      //20 y 30
      const randomPeriod = Math.floor(Math.random() * (51 - 20) + 20);
      divSystem.style.setProperty('--period', `${randomPeriod}s`);
      divSystem.innerHTML = starSystem.reduce((html, star) => html + star.getHtml() ,'')
      fragment.appendChild(divSystem)
    });
    this.$universe.appendChild(fragment)
  }
}

new App();





