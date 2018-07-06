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
    },
    animationClass = {
      init: 'fadeIn',
      in: 'fadeIn',
      out: 'fadeOut'
    }
  } = {}) {
    this.parent           = parent
    this.links            = Array.from(links)
    this.active           = active
    this.margin           = margin
    this.responsive       = responsive
    this.animationClass   = animationClass
    this.elements         = Array.from(this.parent.children)
    this.activeElements   = this.elements
    this.columns          = 1
    this.dataLink         = 'all'
    this.winWidth         = window.innerWidth

    this.init()
  }

  orderelements(){
    let {parent, activeElements, columns, blocWidth, responsive, margin} = this
    let positionX       = 0
    let arrayRectHeight = []
    console.log(arrayRectHeight)

    activeElements.forEach((el, id) => {
      let columnsHeight  = this._sumArrHeight(arrayRectHeight, columns)
      arrayRectHeight.push(el.offsetHeight)
      let rectHeight      = (id - columns >= 0) ? (columnsHeight[id%columns] + (margin * Math.floor(id / columns))) : 0
      el.style.top        = `${rectHeight}px`
      el.style.left       = `${positionX}px`

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
    let {parent, links, active, animationClass} = this

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
      parent.classList.add(animationClass['init'])
    })

    this.resize()
  }

  resize(){
    window.addEventListener('resize', () => {
      clearTimeout(window.sortableResize)
      window.sortableResize = setTimeout(() => {
        this.winWidth = window.innerWidth
        this._setBlocWidth()
        this.orderelements()
      }, 500)
    })
  }

  _setBlocWidth(){
    let {parent, elements, margin, responsive} = this

    let columnsCount    = this._columnsCount(responsive)
    let columns         = this.columns = columnsCount['columns']
    let parentWidth     = parent.clientWidth
    let blocWidth       = this.blocWidth = (parentWidth - (margin * (columns - 1))) / columns

    elements.forEach(el=>{
      el.style.width = blocWidth+'px'
    })
  }
  _filterElements(){
    let {elements, dataLink, animationClass} = this

    this.activeElements = elements.filter(el => {
      if(dataLink === 'all') {
        el.classList.remove(animationClass['out'])
        el.classList.add(animationClass['in'])
        return true
      } else {
        if(el.dataset.sjsel !== dataLink) {
          el.classList.remove(animationClass['in'])
          el.classList.add(animationClass['out'])
          return false
        } else {
          el.classList.remove(animationClass['out'])
          el.classList.add(animationClass['in'])
          return true
        }
      }
    })

    this.orderelements()
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
    return Object.entries(obj).reduce((acc, val)=>{
      return winWidth > val[0] && val[0] >= Math.max(acc['width'])
        ? { width: val[0], columns: val[1]['columns'] }
        : acc
    }, {width: 0, columns: 4})
  }
}
