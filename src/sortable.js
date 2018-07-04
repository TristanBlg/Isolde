class Sortable {
  constructor({
    parent      = document.querySelector('#sortable'),
    links       = document.querySelectorAll('[data-sjslink]'),
    active      = 'is-active',
    margin      = 20,
    responsive  = {
      980: {
        columns: 3
      },
      480: {
        columns: 2
      },
      0: {
        columns: 1
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
    this.dataLink         = 'all'
    this.winWidth         = window.innerWidth

    this.init()
  }

  orderelements(){
    let {parent, activeElements, responsive, margin} = this
    let columnsCount    = this._columnsCount(responsive)
    let columns         = this.columns = columnsCount['columns']
    let parentWidth     = parent.clientWidth
    let rectWidth       = (parentWidth - (margin * (columns - 1))) / columns
    let positionX       = 0
    let arrayRectHeight = []

    new Promise((resolve, reject) => {
      resolve(
        activeElements.forEach((el, id) => {
          el.style.width      = rectWidth+'px'

          let columnsHeight  = this._sumArrHeight(arrayRectHeight, columns)
          arrayRectHeight.push(el.offsetHeight)
          let rectHeight      = (id - columns >= 0) ? (columnsHeight[id%columns] + (margin * Math.floor(id / columns))) : 0
          el.style.top        = `${rectHeight}px`
          el.style.left       = `${positionX}px`

          if(positionX >= rectWidth * (columns - 1)) {
            positionX = 0
          } else {
            positionX = positionX + rectWidth + margin
          }
        })
      )
    }).then(() => {
      let columnsMaxHeight    = this._sumArrHeight(arrayRectHeight, columns)
      let parentHeight        = Math.max(...columnsMaxHeight) + (margin * (Math.floor(activeElements.length / columns) - 1))
      parent.style.height     = parentHeight+'px'
    })
  }

  handleFilterClick(ev, element){
    ev.preventDefault()
    let {links, active} = this
    this.dataLink       = element.dataset.sjslink
    links.forEach(el => {
      el.isEqualNode(element) ? el.classList.add(active) : el.classList.remove(active)
    })
    this._filterElements()
  }

  init(){
    let {parent, elements, links, active} = this

    links.forEach((el, id) => {
      if(id === 0){
        el.classList.add(active)
        this.dataLink = el.dataset.sjslink
      }
      el.addEventListener('click', ev => {
        this.handleFilterClick(ev, el)
      })
    })

    window.addEventListener('load', () => {
      this._filterElements()
      parent.classList.add('fadeIn')
    })

    this.resize()
  }

  resize(){
    window.addEventListener('resize', () => {
      clearTimeout(window.sortableResize)
      window.sortableResize = setTimeout(() => {
        this.winWidth = window.innerWidth
        this.orderelements()
      }, 500)
    })
  }

  _filterElements(){
    let {elements, dataLink} = this
    new Promise((resolve, reject) => {
      resolve(
        this.activeElements = elements.filter(el => {
          if(dataLink === 'all') {
            el.classList.remove('fadeOut')
            el.classList.add('fadeIn')
            return true
          } else {
            if(el.dataset.sjsel !== dataLink) {
              el.classList.remove('fadeIn')
              el.classList.add('fadeOut')
              return false
            } else {
              el.classList.remove('fadeOut')
              el.classList.add('fadeIn')
              return true
            }
          }
        })
      )
    }).then(() => {
      this.orderelements()
    })
  }
  _sumArrHeight(arr, col){
    return arr.reduce((acc, val, id)=>{
      let cle = id%col;
      if(!acc[cle]){
        acc[cle] = 0
      }
      acc[cle] = acc[cle]+val
      return acc 
    }, [])
  }
  _columnsCount(obj){
    let {winWidth} = this
    return Object.entries(obj).reduce((acc, val, id)=>{
      return winWidth > val[0] && val[0] >= Math.max(acc['width'])
        ? { width: val[0], columns: val[1]['columns'] }
        : acc
    }, {width: 0, columns: 4})
  }
}
