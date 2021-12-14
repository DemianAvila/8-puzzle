class Nodo{
    constructor(dato, hijo, hermano){
        this.dato=dato;
        this.hijo=hijo;
        this.hermano=hermano;
    }

    getDato(){
        return this.dato;
    }
    
    setDato(n_dato){
        this.dato=n_dato;
    }

    delDato(){
        this.setDato(null);
    }

    getHijo(){
        return this.hijo;
    }

    setHijo(n_hijo){
        this.hijo=n_hijo;
    }

    getHermano(){
        return this.hermano;
    }

    setHermano(n_hermano){
        this.hermano=n_hermano;
    }

    delHijo(){
        this.setHijo(this.getHermano())
    }

    delHermano(){
        this.setHermano(null);
    }
}