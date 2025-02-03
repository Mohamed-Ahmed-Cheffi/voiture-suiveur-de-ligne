// Fonction pour reculer
function reculer () {
    pins.digitalWritePin(in1, 0)
    pins.digitalWritePin(in2, 1)
    pins.digitalWritePin(in3, 0)
    pins.digitalWritePin(in4, 1)
}
// Fonction pour tourner à gauche
function tournerGauche () {
    pins.digitalWritePin(in1, 0)
    pins.digitalWritePin(in2, 0)
    pins.digitalWritePin(in3, 1)
    pins.digitalWritePin(in4, 0)
}
// Fonction pour tourner à droite
function tournerDroite () {
    pins.digitalWritePin(in1, 1)
    pins.digitalWritePin(in2, 0)
    pins.digitalWritePin(in3, 0)
    pins.digitalWritePin(in4, 0)
}
// Capteur obstacle
// Fonction pour avancer
function avancer () {
    pins.digitalWritePin(in1, 1)
    pins.digitalWritePin(in2, 0)
    pins.digitalWritePin(in3, 1)
    pins.digitalWritePin(in4, 0)
}
// Fonction pour arrêter
function arreter () {
    pins.digitalWritePin(in1, 0)
    pins.digitalWritePin(in2, 0)
    pins.digitalWritePin(in3, 0)
    pins.digitalWritePin(in4, 0)
}
let obstacleDetecte = 0
let ligneDroit = 0
let ligneGauche = 0
let in4 = 0
let in3 = 0
let in2 = 0
let in1 = 0
// Initialisation des broches pour les moteurs
// Moteur gauche avancer
in1 = DigitalPin.P8
// Moteur gauche reculer
in2 = DigitalPin.P12
// Moteur droit avancer
in3 = DigitalPin.P0
// Moteur droit reculer
in4 = DigitalPin.P1
// Initialisation des broches pour les capteurs IR
// Capteur IR gauche
let capteurGauche = DigitalPin.P2
// Capteur IR droit
let capteurDroit = DigitalPin.P3
// Capteur obstacle
let capteurObstacle = DigitalPin.P4
// Boucle principale
basic.forever(function () {
    // Lire les capteurs IR
    // 0 si sur la ligne, 1 sinon
    ligneGauche = pins.digitalReadPin(capteurGauche)
    // 0 si sur la ligne, 1 sinon
    ligneDroit = pins.digitalReadPin(capteurDroit)
    // 0 si obstacle, 1 sinon
    obstacleDetecte = pins.digitalReadPin(capteurObstacle)
    // Suivi de ligne
    if (ligneGauche == 0 && ligneDroit == 0) {
        // Les deux capteurs sont sur la ligne : avancer
        avancer()
    } else if (ligneGauche == 0 && ligneDroit == 1) {
        // Capteur gauche sur la ligne : tourner à droite
        tournerDroite()
    } else if (ligneGauche == 1 && ligneDroit == 0) {
        // Capteur droit sur la ligne : tourner à gauche
        tournerGauche()
    } else {
        // Aucun capteur sur la ligne : reculer ou ajuster
        reculer()
        // Pause pour éviter de boucler rapidement
        basic.pause(500)
        arreter()
    }
    // Détecter obstacle
    if (obstacleDetecte == 0) {
        // Obstacle détecté : s'arrêter et reculer
        arreter()
        basic.pause(500)
        reculer()
        basic.pause(1000)
        arreter()
    }
})
