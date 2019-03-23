
window.onload = () => {
    new JogoVelha();
  };
  
  class JogoVelha {
    constructor() {
      this.iniciaElementos();
      this.iniciaEstado();
    }
  
    iniciaEstado() {
      this.turno = true;
      this.jogadas = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.fim = false;
      this.vitoria = [448, 56, 7, 292, 146, 73, 273, 84]; // usando bitmap e oprcao bitwise.
    }
  
    iniciaElementos() {
     
      this.velha = document.querySelector("#velha");
      this.velha.addEventListener("click", event => {
        this.realizaJogada(event);
        this.render();
      });
    }
  
  
    realizaJogada(event) {
      const id = event.target.dataset.id;
  
      this.jogadas[id] = this.turno ? "X" : "O";
  
      this.turno = !this.turno;
    }
  
    render() {
      const resultado = this.verificaVitoria();
  
      if (resultado == "X" || resultado == "O") {
        this.fim = true;
  
      }
  
      //iterar nos elementos do tabuleiro
      const velhaElemento = document.querySelectorAll("[data-id]");
      for (let i = 0; i < 9; i++) {
        velhaElemento[i].innerHTML = this.jogadas[i] == 0 ? "" : this.jogadas[i];
      }
    }
  
    verificaVitoria() {
      //decimal da sequencia de quem jogou x
      const valorX = parseInt(
        this.jogadas.map(value => (value == "X" ? 1 : 0)).join(""),
        2
      );
      //decimal da sequencia de quem jogou y
      const valorO = parseInt(
        this.jogadas.map(value => (value == "O" ? 1 : 0)).join(""),
        2
      );
  
      //percorrer array vitoria perguntando
      for (const element of this.vitoria) {
        if ((element & valorX) == element) {
          return "X";
        }
        if ((element & valorO) == element) {
          return "O";
        }
      }
  
      return "";
    }
}