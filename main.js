//Mois de janvier => quel numéro ?
//Avant de récupérer le mois je récupère la date complete d'aujourd'hui

/*let today = new Date()
let year = today.getFullYear()
let month = today.getMonth()

let selectedDate = today

//Comment je récupère la date pour le premier de ce mois ?
//pas d'idée ?
//Trop timide ?

let monthStart = new Date(year, month, 1).getDay()
let daysInMonth = new Date(year, month + 1, 0).getDate()

//On crée l'élément qui va recevoir les jours
const days = document.createElement('div')
days.classList.add('calendar')

for(let i = 1; i < monthStart; i++) {
  let day = document.createElement('div')
  day.classList.add('day')
  days.append(day)
}
//créons les div qui auront une date à l'interieur
for(let i = 0; i < daysInMonth; i++) {
  let day = document.createElement('div')
  day.classList.add('day')
  day.innerHTML = `${i + 1}`

  //maintenant il va falloir que j'affiche le jour "actif",
  // - soit le jour où nous sommes (aujourd'hui le 13)
  // - soit le jour que l'on va sélectionner
  //Que faut il que je fasse ?

  if(selectedDate.getDate() === i + 1) {
    day.classList.add('selected')
  }

  //Rajoutons un event listener
  day.addEventListener('click', e => {
    e.preventDefault()
    e.stopPropagation()
    //Si je clique sur un jour, ca veux dire que je sélectionne ce jour
    //il nous faut donc une variable dans laquel je vais mettre le jour sélectionné
    //1. on récupère le ou les (pourquoi pas) .day qui ont aussi .selected
    let daysSelected = document.querySelectorAll('.day.selected')
    daysSelected.forEach(el => {
      el.classList.remove('selected')
    })
    //2. On ajoute la classe selected au div sur lequel je viens de cliquer
    e.target.classList.add('selected')
  })

  days.append(day)


}



document.body.appendChild(days)*/