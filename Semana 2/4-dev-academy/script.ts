export interface Curso {
    id: number, 
    nivel: string,
    nome: string,
    descricao1: string,
    descricao2: string
}

class CursosComponent {
    private conteiner: HTMLElement | null = null;
    private inputBusca: HTMLInputElement | null = null;
    private arrayCursos: Curso[] = [];

    constructor() {
        this.conteiner = document.getElementById("grid-cursos");

        this.inputBusca = document.getElementById("input-busca") as HTMLInputElement;

        if (this.conteiner && this.inputBusca) {
            this.init();
        }
    }

    private async init(): Promise<void> {
        try {
            const response = await fetch("./cursos.json");

            if (!response.ok) {
                throw new Error("Erro ao carregar cursos");
            } else {
                this.arrayCursos = await response.json();
                this.exibirCursos(this.arrayCursos);
                this.prepararBusca();
            }
        } catch (error) {
            if (this.conteiner) {
                this.conteiner.innerHTML = "<p>Erro ao buscar os cursos! Favor tentar novamente em instantes.</p>";
                console.log("erro:", error);
            }
        }
    }

    private prepararBusca(): void {
        if (!this.inputBusca) {
            return;
        }

        this.inputBusca.addEventListener("input", () => {
            const parametroBusca = this.inputBusca?.value.toLowerCase() || "";

            const cursosFiltrados = this.arrayCursos.filter(curso =>
                curso.nome.toLowerCase().includes(parametroBusca) || 
                curso.descricao2.toLowerCase().includes(parametroBusca)
            )

            this.exibirCursos(cursosFiltrados);
        })
    }

    private exibirCursos(cursos: Curso[]): void {
        if (!this.conteiner) {
            return;
        }
        
        if (cursos.length === 0) {
            this.conteiner.innerHTML = "<p>Nenhum curso encontrado.</p>";
        } else {
            this.conteiner.innerHTML = cursos.map(curso => `
                <article class="curso-card">
                    <p class="curso-card__nivel">${curso.nivel}</p>
                    <div class="curso-card__descricao">
                        <h2 class="nome-curso">${curso.nome}</h2>
                        <p class="descricao-curso">
                            <span class="destaque">${curso.descricao1}:</span> 
                            ${curso.descricao2}
                        </p>
                    </div>
                    <button class="curso-card__botao">Saber mais</button>
                </article>
            `).join("");
        }
    }
}

class MenuHeader {
    private botao: HTMLButtonElement | null;
    private menu: HTMLElement | null;

    constructor() {
        this.botao = document.getElementById("botao-header") as HTMLButtonElement;
        this.menu = document.getElementById("menuMobile");

        if (this.botao && this.menu) {
            this.atrelarEventos();
        }
    }

    private atrelarEventos(): void {
        this.botao?.addEventListener("click", () => this.alterarEstadoMenu());

        this.menu?.addEventListener("click", (e: Event) => {
            this.alterarEstadoMenu();
        })
    }

    private alterarEstadoMenu(): void {
        if (!this.menu || !this.botao) {
            return;
        }

        const lateralMenu = document.getElementById("lateralMenu");

        if (this.menu.classList.contains("aberto")) {
            this.menu.classList.add("fechando");
            lateralMenu?.classList.remove("opacidade-menu");
            this.animarFechamento();
        } else {
            this.menu.classList.add("aberto");
            this.animarAbertura(lateralMenu);
            this.menu.setAttribute("aria-expanded", "true");
        }
    }

    private animarAbertura(lateralMenu: HTMLElement | null) {
        this.menu?.addEventListener("animationend", () => {
            lateralMenu?.classList.add("opacidade-menu");
        }, { once: true });
    }

    private animarFechamento() {
        this.menu?.addEventListener("animationend", () => {
            this.menu!.classList.remove("aberto", "fechando");
            this.menu!.setAttribute("aria-expanded", "false");
        }, { once: true });
    }
}

function limparInputNewsletter() {
    const botaoNewsletter = document.getElementById("botao-newsletter");
    const inputNewsletter = document.getElementById("input-newsletter") as HTMLInputElement;

    botaoNewsletter?.addEventListener("click", () => {
        if (inputNewsletter) {
            inputNewsletter.value = "";
        }
    });
}

// Inicialização segura
globalThis.addEventListener("DOMContentLoaded", () => {
    // Inicializa o 'componente' do menu mobile
    new MenuHeader();

    // Inicializa o 'componente' dos cursos
    new CursosComponent();

    // Limpar input da newsletter ao clicar no botão
    limparInputNewsletter();
});
