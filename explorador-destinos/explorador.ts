export interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

export interface Favorito {
    id: number
}

const arrayFavoritos: Favorito[] = [];
const arrayPosts: Post[] = [];

function carregarFavoritos(): void {
    const dados = localStorage.getItem("favoritos");

    if (dados) {
        const favoritos: Favorito[] = JSON.parse(dados);
        arrayFavoritos.push(...favoritos);
    }
}

function alterarStatusFavorito(idPost: number): void {
    if (determinarSeEhFavorito(idPost)) {
        const indexPost = arrayFavoritos.findIndex(post => post.id === idPost);
        arrayFavoritos.splice(indexPost, 1);
    } else {
        arrayFavoritos.push({ id: idPost });
    }

    localStorage.setItem("favoritos", JSON.stringify(arrayFavoritos));
    criarElementoPost(arrayPosts);
}

async function buscarDados(): Promise<void> {
    try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/posts");
        arrayPosts.push(...await resposta.json());
        criarElementoPost(arrayPosts);
    } catch(error) {
        console.error("Erro ao solicitar a requisição", error);
    }
}

function criarElementoPost(arrayPost: Post[]): void {
    const containerDestinos = document.getElementById("destinos");
    const containerFavoritos = document.getElementById("favoritos");

    if (containerDestinos) {
        containerDestinos.innerHTML = "";
    }

    if (containerFavoritos) {
        containerFavoritos.innerHTML = "";
    }

    arrayPost.forEach(post => {
        const ehFavorito = determinarSeEhFavorito(post.id);

        const criarCard = () => {
            const div = document.createElement("div");
            div.classList.add("destino");

            const p = document.createElement("p");
            p.textContent = post.title;

            const img = document.createElement("img");
            
            img.addEventListener("click", () => {
                alterarStatusFavorito(post.id);
            });

            if (ehFavorito) {
                img.src = "./assets/favorito.svg";
                img.alt = "Ícone de coração preenchido";
            } else {
                img.src = "./assets/nao-favorito.svg";
                img.alt = "Ícone de coração";
            }

            div.appendChild(p);
            div.appendChild(img);

            return div;
        };
        
        containerDestinos?.appendChild(criarCard());

        if (ehFavorito) {
            containerFavoritos?.appendChild(criarCard());
        }
    });
}

function determinarSeEhFavorito(idPost: number): boolean {
    const indexPost = arrayFavoritos.findIndex(post => post.id === idPost);
    
    if (indexPost >= 0) {
        return true;
    } else {
        return false;
    }
}

function minhaLocalizacao():void {
    const geoTela = document.getElementById("user-geo") as HTMLSpanElement;

    navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => {
            const {latitude,longitude} = pos.coords;
            if (geoTela) {
                geoTela.innerHTML = `Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}`;
            }
        },
        (err:GeolocationPositionError) => {
            if (geoTela) {
                geoTela.innerText = "Aconteceu um erro ao buscar sua localização!";
            }
            console.error(err.message);
        }
    )
}

minhaLocalizacao();

carregarFavoritos();

buscarDados(); 

console.log("dados carregados");