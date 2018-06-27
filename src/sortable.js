class Sortable {
  constructor({
    parent    = document.querySelector('[data-s]'),
    links     = document.querySelectorAll('[data-s-link]'),
    elements  = document.querySelectorAll('[data-s-element]'),
    active    = 'is-active',
    column    = 3, 
    margin    = 20
  } = {}) {
    this.parent     = parent
    this.links      = Array.from(links)
    this.active     = active
    this.elements   = Array.from(elements)
    this.column     = column
    this.margin     = margin

    this.init()
    this.resize()
  }

  orderelements(){
    let {parent, elements, column, margin} = this

    let windowWidth = window.innerWidth
    if(windowWidth <= 980 && windowWidth > 480) {
      column = 2
    } else if (windowWidth <= 480) {
      column = 1
    }

    let parentWidth     = parent.offsetWidth
    let rectWidth       = (parentWidth - (margin * (column - 1))) / column
    let positionX       = 0
    let arrayRectHeight = []

    new Promise((resolve, reject) => {
      resolve(
        elements.forEach((el, id) => {
          el.style.position   = "absolute"
          el.style.width      = rectWidth+'px'


          const columnsHeight = sumArrHeight(arrayRectHeight)
          arrayRectHeight.push(el.offsetHeight)
          let rectHeight      = (id - column >= 0) ? (columnsHeight[id%column] + (margin * Math.floor(id / column))) : 0
          el.style.transform  = `translate3d(${positionX}px, ${rectHeight}px, 0px)`


          if(positionX >= rectWidth * (column - 1)) {
            positionX = 0
          } else {
            positionX = positionX + rectWidth + margin
          }
          el.style.transition = 'transform .2s ease-in-out, opacity .2s ease-in-out'
        })
      )
    }).then(() => {
      const columnsHeight = sumArrHeight(arrayRectHeight)
      parent.style.position   = 'relative'
      let parentHeight        = Math.max(...columnsHeight) + (margin * Math.floor(elements.length / column))
      parent.style.height     = parentHeight+'px'
    })

    function sumArrHeight(arr){
      return arr.reduce((acc, val, id)=>{
        let cle = id%column;
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
    let {links, active} = this
    const dataLink = element.dataset.sLink
    links.forEach(el => {
      el.isEqualNode(element) ? el.classList.add(active) : el.classList.remove(active)
    })
    let newelements = Array.from(document.querySelectorAll(`[data-s-element]`))
    new Promise((resolve, reject) => {
      resolve(
        this.elements = newelements.filter(el => {
          if(dataLink === 'all') {
            el.style.opacity = '1'
            return true
          } else {
            if(el.dataset.sElement !== dataLink) {
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
