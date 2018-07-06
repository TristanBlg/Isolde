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
    this.margin           = margin
    this.responsive       = responsive
    this.elements         = Array.from(this.parent.children)
    this.activeElements   = this.elements
    this.columns          = 1
    this.dataLink         = 'all'
    this.winWidth         = window.innerWidth

    this.init()
  }

  orderelements(){
    console.log(this)
    let {parent, activeElements, columns, blocWidth, responsive, margin} = this
    let positionX       = 0
    let arrayRectHeight = []

    activeElements.forEach((el, id) => {
      let columnsHeight   = this._sumArrHeight(arrayRectHeight, columns)
      arrayRectHeight.push(el.offsetHeight)
      let rectHeight      = (id - columns >= 0) ? (columnsHeight[id%columns] + (margin * Math.floor(id / columns))) : 0
      el.style.transform  = `translate3d(${positionX}px, ${rectHeight}px, 0)`

      if(positionX >= blocWidth * (columns - 1)) {
        positionX = 0
      } else {
        positionX = positionX + blocWidth + margin
      }
    })

    let columnsMaxHeight    = this._sumArrHeight(arrayRectHeight, columns)
    let parentHeight        = Math.max(...columnsMaxHeight) + (margin * (Math.floor(activeElements.length / columns) - 1))
    parent.style.height     = parentHeight+'px'
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
    let {parent, links, active} = this

    links.forEach((el, id) => {
      if(id === 0){
        el.classList.add(active)
        this.dataLink = el.dataset.sjslink
      }
      el.addEventListener('click', ev => {
        this.handleFilterClick(ev, el)
      })
    })

    this._setBlocWidth()

    window.addEventListener('load', () => {
      this._filterElements()
      parent.style.opacity = 1
    })

    this.resize()
  }

  resize(){
    window.addEventListener('resize', () => {
      clearTimeout(window.sortableResize)
      window.sortableResize = setTimeout(() => {
        this.winWidth = window.innerWidth
        this._setBlocWidth(()=>{
          this.orderelements()
        })
        
      }, 500)
    })
  }

  _setBlocWidth(callback){
    let {parent, elements, margin, responsive} = this

    let columnsCount    = this._columnsCount(responsive)
    let columns         = this.columns = columnsCount['columns']
    let parentWidth     = parent.clientWidth
    let blocWidth       = this.blocWidth = (parentWidth - (margin * (columns - 1))) / columns

    elements.forEach(el=>{
      el.style.width = blocWidth+'px'
    })
    if(callback){
      callback()
    }
  }
  _filterElements(){
    let {elements, dataLink} = this

    this.activeElements = elements.filter(el => {
      if(dataLink === 'all') {
        el.style.opacity = 1
        return true
      } else {
        if(el.dataset.sjsel !== dataLink) {
          el.style.opacity = 0
          return false
        } else {
          el.style.opacity = 1
          return true
        }
      }
    })

    this.orderelements()
  }
  _sumArrHeight(arr, col){
    return arr.reduce((acc, val, id)=>{
      let cle = id%col
      if(!acc[cle]){
        acc[cle] = 0
      }
      acc[cle] = acc[cle]+val
      return acc 
    }, [])
  }
  _columnsCount(obj){
    let {winWidth} = this
    return Object.entries(obj).reduce((acc, val)=>{
      return winWidth > val[0] && val[0] >= Math.max(acc['width'])
        ? { width: val[0], columns: val[1]['columns'] }
        : acc
    }, {width: 0, columns: 4})
  }
}
