import Card from "./Card.js";
import CoopDom from "../CoopDom.js";

export default class Column extends CoopDom {
    constructor(title, cards) {
        super();
        this.title = title;
        this.cards = cards;

        // Appel de la méthode qui va afficher la colonne
        this.domElements = this.render();

        //appel de la methode qui va afficher les cards
        this.renderCards();
        this.creatForm();



    }
    creatForm = () => {


        // affichage du formulaire au click sur le bouton modifier
        this.domElements.button.onclick = () => {

            this.domElements.form_crea.hidden = false;

        };

        // gestion de la soumission du formulaire de modification
        this.domElements.form_crea.onsubmit = (event) => {
            console.log("Gestion de la soumission du formulaire de modification");
            event.preventDefault();

            // Récupération des nouvelles valeurs
            const create_question = this.domElements.create_question.value;
            const create_answer = this.domElements.create_answer.value;

            // Modification à la fois des propriétés question et answer
            // mais aussi des éléments du dom correspondant

            this.domElements.create_question.textContent = create_question;
            this.domElements.create_answer.textContent = create_answer;
            this.addCard(create_question, create_answer);
            this.domElements.form_crea.hidden = true;

            // on cache le formulaire

        }
    }


    addCard = (question, response) => {
        console.log("dans addCard");
        new Card(question, response, this); // this représente l'instance de la colonne
    }
    removeCard = (card) => {
        console.log("Dans removeCard");
        card.domElements.article.remove(); // supprime l'élément du dom article de la carte
    }
    renderCards = () => {
        for (let card of this.cards) {
            new Card(card.question, card.reponse, this);
        }
    }
    render = () => {
        // Création  des éléments du DOM grâce à la méthode createAddDomElt héritée de CoopDom
        const section = this.createAddDomElt("section", "", document.querySelector("#board"), { "class": "column col-3" });
        const title = this.createAddDomElt("h3", this.title, section);
        const button = this.createAddDomElt("button", "Ajouter une carte", section, { "class": "btn btn-success" });
        const section_cards = this.createAddDomElt("section", "", section, { "class": "cards" });



        const form_crea = this.createAddDomElt(
            "form",
            "",
            section
        );
        const labelQuestion = this.createAddDomElt(
            "label",
            "Question",
            form_crea
        );
        const create_question = this.createAddDomElt(
            "input",
            "",
            form_crea, { "type": "text", "value": "", "class": "form-control" }
        );
        const labelAnswer = this.createAddDomElt(
            "label",
            "Réponse",
            form_crea
        );
        const create_answer = this.createAddDomElt(
            "input",
            "",
            form_crea, { "type": "text", "value": "", "class": "form-control" }
        );
        const button_submit_crea = this.createAddDomElt(
            "input",
            "",
            form_crea, { "type": "submit", "value": "valider", "class": "btn btn-primary mt-3 mb-3" }
        );
        form_crea.hidden = true;



        return {
            "section": section,
            "title": title,
            "button": button,
            "section_cards": section_cards,
            "form_crea": form_crea,
            "create_answer": create_answer,
            "labelAnswer": labelAnswer,
            "label_question": labelQuestion,
            "create_question": create_question,
            "button_submit_crea": button_submit_crea,

        };

        // il faut faire en sorte que les cartes contenues dans this.cards
        // génèrent des éléments du dom en passant par la class "Card"

    }
}