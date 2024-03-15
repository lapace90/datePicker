//Tout est pratiquement pareil
//Je commence par écrire la méthode classique

//Dans notre cas, je vais modifier un élément de type input
//Aussi au lieu d'étendre de HTMLElement, je vais le faire étendre de HTMLInputElement
//Mais comment dire à notre input dans le fichier HTML qu'il va avoir un comportement différent ?
//Cela se fait en 2 temps :
//1. dans la définition du customElement (tout en bas) je vais lui dire sur quel type d'élément il va pouvoir se greffer
//2. dans le fichier HTML, je vais lui dire (à l'input) qu'il va avoir le nouveau comportement
class Datepicker extends HTMLInputElement {
  weekday = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  container = document.createElement('div')
  //Je vais faire quelque chose pour voir si le comportement est bien greffer
  constructor() {
    super();
    if(this.value != "") {
      let split = this.value.split("/")
      this.selectedDay = new Date(split[2], split[1], split[0], 0, 0, 0)
    } else {
      this.selectedDay = new Date()
    }
    this.calendar = this.init()
    /*console.log(value)
    let day = parseInt(value[0])
    let month = parseInt(value[1])
    let year = parseInt(value[2])
    console.log(this.value)
    this.selectedDay = new Date(year, month, day)*/
    /*const options = {
      day: 'numeric',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
    };
    console.log(this.selectedDay.toLocaleDateString("fr-FR", options))
    console.log(this.selectedDay.toLocaleDateString("de-DE", options))*/
  }
  connectedCallback() {
    //On rajoute le comportement d'affichage du calendrier
    this.addEventListener('focus', e => {
      //on crée un div qui va récupérer tous le calendrier, on va lui mettre un style position absolute (ou relative, je sais pas encore)
      this.container.classList.add('container')
      //Petit probleme : comment récupérer les différents div qu'on a créer pour les ajouter a notre '.container' ?
      this.container.appendChild(this.calendar)
      //2eme petit probleme : comment/ou on rajoute tout ca dans le DOM ?
      //Pour le rajouter on va utiliser appendBefore ?
      this.after(this.container)
      //ca fonctionne

    })
    document.body.addEventListener('click', e => {
      if(!e.target.classList.contains('day') && !e.target.classList.contains('calendar') && e.target !== this) {
        this.container.remove()
      }
    })
  }

  init() {
    let year = this.selectedDay.getFullYear()
    let month = this.selectedDay.getMonth()
    return this.createCalendar(month, year)
  }

  createCalendar(month, year) {
    let date = new Date(year, month, 1)
    let monthStart = new Date(year, month, 1).getDay()
    let daysInMonth = new Date(year, month + 1, 0).getDate()

    //On crée l'entête
    const header = document.createElement('div')
    header.className = "header"

    const actions = document.createElement('div')
    actions.className = "actions"
    const prec = document.createElement('div')
    prec.addEventListener('click', e => {
      let newMonth = month
      let newYear  = year
      if(month === 0) {
        newMonth = 11
        newYear = year - 1
      } else {
        newMonth--
      }
      let newCalendar = this.createCalendar(newMonth, newYear)
      this.container.replaceChild(newCalendar, this.calendar)
      this.calendar = newCalendar
    })
    prec.className = 'prec'
    prec.innerHTML = "&#x3008;"
    const $month = document.createElement('div')
    $month.textContent = date.toLocaleDateString("fr-FR", {month: 'long'})
    $month.className = "month"
    const $year = document.createElement('div')
    $year.textContent = year
    $year.className = "year"
    const suiv = document.createElement('div')
    suiv.innerHTML = "&#x3009;"
    suiv.className = 'suiv'

    actions.appendChild(prec)
    actions.appendChild($month)
    actions.appendChild($year)
    actions.appendChild(suiv)

    const $weekday = document.createElement('div')
    $weekday.className = "weekday"
    for(let i = 0; i < this.weekday.length; i++) {
      let $day = document.createElement('div')
      $day.textContent = this.weekday[i]
      $weekday.appendChild($day)
    }

    header.appendChild(actions)
    header.appendChild($weekday)



    //On crée l'élément qui va recevoir les jours
    const calendar = document.createElement('div')
    calendar.classList.add('calendar')

    calendar.appendChild(header)

    for (let i = 1; i < monthStart; i++) {
      let day = document.createElement('div')
      day.classList.add('day')
      calendar.append(day)
    }
    //créons les div qui auront une date à l'interieur
    for (let i = 0; i < daysInMonth; i++) {
      let day = document.createElement('div')
      day.classList.add('day')
      day.innerHTML = `${i + 1}`

      //maintenant il va falloir que j'affiche le jour "actif",
      // - soit le jour où nous sommes (aujourd'hui le 13)
      // - soit le jour que l'on va sélectionner
      //Que faut il que je fasse ?

      if (this.selectedDay.getDate() === i + 1) {
        day.classList.add('selected')
      }

      //Rajoutons un event listener
      day.addEventListener('click', e => {
        e.preventDefault()
        //e.stopPropagation()

        let newselectedDate = new Date()

        //Si je clique sur un jour, ca veux dire que je sélectionne ce jour
        //il nous faut donc une variable dans laquel je vais mettre le jour sélectionné
        //1. on récupère le ou les (pourquoi pas) .day qui ont aussi .selected
        let daysSelected = document.querySelectorAll('.day.selected')
        daysSelected.forEach(el => {
          el.classList.remove('selected')
        })
        //2. On ajoute la classe selected au div sur lequel je viens de cliquer
        e.target.classList.add('selected')
        this.value = `${this.selectedDay.getDate()}/${this.selectedDay.getMonth() + 1}/${this.selectedDay.getFullYear()}`
      })
      calendar.append(day)
    }
    return calendar
  }

}

customElements.define('date-picker', Datepicker,{ extends: 'input'} )