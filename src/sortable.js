class Sortable {
  constructor({
    parent      = document.querySelector('#sortable'),
    links       = document.querySelectorAll('a[data-sortablejs]'),
    active      = 'is-active',
    margin      = 20,
    responsive  = {
      980: {
        columns: 3,
        foo: 'bar'
      },
      480: {
        columns: 2,
        foo: 'bar'
      },
      0: {
        columns: 1,
        foo: 'bar'
      }
    }
  } = {}) {
    this.parent           = parent
    this.links            = Array.from(links)
    this.active           = active
    this.elements         = Array.from(this.parent.children)
    this.activeElements   = this.elements
    this.columns          = 1
    this.margin           = margin
    this.responsive       = responsive

    this.init()
  }

  orderelements(){
    let {parent, activeElements, columns, margin} = this
    let windowWidth   = window.innerWidth
    let columnsCount  = Object.entries(this.responsive).reduce((acc, val, id)=>{
      let cle = val[0]
      if(!acc[cle] && windowWidth > cle && cle > Math.max(acc[0])){
        acc[0] = cle
        acc[1] = val[1]['columns']
      }
      return acc
    }, [0, 1])
    this.columns = columns = columnsCount[1]

    let parentWidth     = parent.offsetWidth
    let rectWidth       = (parentWidth - (margin * (columns - 1))) / columns
    let positionX       = 0
    let arrayRectHeight = []

    new Promise((resolve, reject) => {
      resolve(
        activeElements.forEach((el, id) => {
          el.style.position   = "absolute"
          el.style.width      = rectWidth+'px'

          let columnssHeight  = sumArrHeight(arrayRectHeight, columns)
          arrayRectHeight.push(el.offsetHeight)
          let rectHeight      = (id - columns >= 0) ? (columnssHeight[id%columns] + (margin * Math.floor(id / columns))) : 0
          el.style.transform  = `translate3d(${positionX}px, ${rectHeight}px, 0px)`

          if(positionX >= rectWidth * (columns - 1)) {
            positionX = 0
          } else {
            positionX = positionX + rectWidth + margin
          }
          el.style.transition = 'transform .2s ease-in-out, opacity .2s ease-in-out'
        })
      )
    }).then(() => {
      parent.style.position   = 'relative'
      let columnssHeight      = sumArrHeight(arrayRectHeight, columns)
      let parentHeight        = Math.max(...columnssHeight) + (margin * (Math.floor(activeElements.length / columns) - 1))
      parent.style.height     = parentHeight+'px'
    })

    function sumArrHeight(arr, col){
      return arr.reduce((acc, val, id)=>{
        let cle = id%col;
        if(!acc[cle]){
          acc[cle] = 0
        }
        acc[cle] = acc[cle]+val
        return acc 
      }, [])
    }
  }

  clickFilter(ev, element) {
    ev.preventDefault()
    let {links, active, elements} = this
    const dataLink = element.dataset.sortablejs
    links.forEach(el => {
      el.isEqualNode(element) ? el.classList.add(active) : el.classList.remove(active)
    })
    new Promise((resolve, reject) => {
      resolve(
        this.activeElements = elements.filter(el => {
          if(dataLink === 'all') {
            el.style.opacity = '1'
            return true
          } else {
            if(el.dataset.sortablejs !== dataLink) {
              el.style.opacity = '0'
              return false
            } else {
              el.style.opacity = '1'
              return true
            }
          }
        })
      )
    }).then(() => {
      this.orderelements()
    })
  }

  init(){
    const {links, active} = this
    new Promise((resolve, reject) => {
      resolve(
        links.forEach((el, id) => {
          if(id === 0){
            el.classList.add(active)
          }
          el.style.cursor = "pointer"
          el.addEventListener('click', ev => {
            this.clickFilter(ev, el)
          })
        })
      )
    }).then(() => {
      window.addEventListener('load', () => {
        this.orderelements()
      })
    }).then(()=> {
      this.resize()
    })
  }

  resize() {
    window.addEventListener('resize', () => {
      clearTimeout(window.sortableResize)
      window.sortableResize = setTimeout(() => {
        this.orderelements()
      }, 500)
    })
  }
}
