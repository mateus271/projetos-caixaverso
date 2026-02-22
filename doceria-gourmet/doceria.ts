interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    imagemUrl: string;
}

const doces: Produto[] = [
    {
        id: 1,
        nome: "Bolo",
        descricao: "Bolo delicioso de chocolate com cobertura cremosa",
        preco: 35.00,
        imagemUrl: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec"
    },
    {
        id: 2,
        nome: "Cookies",
        descricao: "Cookies crocantes com gotas de chocolate belga",
        preco: 12.50,
        imagemUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35"
    },
    {
        id: 3,
        nome: "Trufas",
        descricao: "Caixa com trufas sortidas artesanais",
        preco: 25.00,
        imagemUrl: "https://images.unsplash.com/photo-1582493255270-b3844e2a63c8"
    },
    {
        id: 4,
        nome: "Sorvete",
        descricao: "Sorvete artesanal de frutas vermelhas",
        preco: 18.00,
        imagemUrl: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f"
    },
    {
        id: 5,
        nome: "Minhocas",
        descricao: "Minhocas de goma ácidas e divertidas",
        preco: 5.00,
        imagemUrl: "https://images.unsplash.com/photo-1600359756098-8bc52195bbf4"
    },
    {
        id: 6,
        nome: "Milkshake",
        descricao: "Milkshake cremoso de baunilha com chantilly",
        preco: 20.00,
        imagemUrl: "https://plus.unsplash.com/premium_photo-1695868328902-b8a3b093da74"
    }
];

interface ItemPedido extends Produto {
    quantidade: number;
    subtotal: number;
}

interface Pedido {
    id: number;
    itens: ItemPedido[];
    total: number;
    data: Date;
}

let pedidoAtual: Pedido = {
    id: 1,
    itens: [],
    total: 0,
    data: new Date()
};

function renderizarProdutos(): void {
    const produtosContainer = document.getElementById('produtos');
    
    if (produtosContainer) {
        produtosContainer.innerHTML = doces.map(produto => `
            <div class="produto-card">
                <img src="${produto.imagemUrl}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                <button class="btn-comprar" 
                    data-id="${produto.id}" 
                    data-nome="${produto.nome}" 
                    data-preco="${produto.preco}">
                    Adicionar ao Carrinho
                </button>
            </div>
        `).join('');

        const buttons = produtosContainer.querySelectorAll('.btn-comprar');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                const id = Number(target.dataset.id);
                adicionarAoCarrinho(id);
            });
        });
    }
}

function adicionarAoCarrinho(id: number): void {
    const produto = doces.find(p => p.id === id);
    if (!produto) return;

    const itemExistente = pedidoAtual.itens.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
        itemExistente.subtotal = itemExistente.quantidade * itemExistente.preco;
    } else {
        const novoItem: ItemPedido = {
            ...produto,
            quantidade: 1,
            subtotal: produto.preco
        };
        pedidoAtual.itens.push(novoItem);
    }

    pedidoAtual.total = pedidoAtual.itens.reduce((total, item) => total + item.subtotal, 0);
    renderizarPedido();
}

function removerItem(id: number): void {
    pedidoAtual.itens = pedidoAtual.itens.filter(item => item.id !== id);
    pedidoAtual.total = pedidoAtual.itens.reduce((total, item) => total + item.subtotal, 0);
    renderizarPedido();
}

function removerUnidade(id: number): void {
    const item = pedidoAtual.itens.find(item => item.id === id);
    if (item && item.quantidade > 1) {
        item.quantidade--;
        item.subtotal = item.quantidade * item.preco;
        pedidoAtual.total = pedidoAtual.itens.reduce((total, item) => total + item.subtotal, 0);
        renderizarPedido();
    }
}

function renderizarPedido(): void {
    const pedidoContainer = document.getElementById('pedido');

    if (pedidoContainer) {
        pedidoContainer.innerHTML = `
            <h2>Seu Pedido</h2>
            ${pedidoAtual.itens.map(item => `
                <div class="pedido-card">
                    <img src="${item.imagemUrl}" alt="${item.nome}" class="pedido-img">
                    <div>
                        <h4>${item.nome}</h4>
                        <p>Quantidade: ${item.quantidade}</p>
                        <p>Subtotal: R$ ${item.subtotal.toFixed(2)}</p>
                        <div class="acoes-item">
                            ${item.quantidade > 1 ? `<button class="btn-diminuir" data-id="${item.id}">-1</button>` : ''}
                            <button class="btn-remover-item" data-id="${item.id}">Excluir</button>
                        </div>
                    </div>
                </div>
            `).join('')}
            <h3>Total: R$ ${pedidoAtual.total.toFixed(2)}</h3>
            ${pedidoAtual.itens.length > 0 ? `<button id="btn-finalizar" class="btn-finalizar">Finalizar Pedido</button>` : ''}
        `;

        const btnsDiminuir = pedidoContainer.querySelectorAll('.btn-diminuir');
        btnsDiminuir.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                const id = Number(target.getAttribute('data-id'));
                removerUnidade(id);
            });
        });

        const btnsRemover = pedidoContainer.querySelectorAll('.btn-remover-item');
        btnsRemover.forEach(btn => {
            btn.addEventListener('click', (event) => {
                const target = event.target as HTMLElement;
                const id = Number(target.getAttribute('data-id'));
                removerItem(id);
            });
        });

        const btnFinalizar = document.getElementById('btn-finalizar');
        if (btnFinalizar) {
            btnFinalizar.addEventListener('click', () => {
                alert('Pedido concluído com sucesso!');
                pedidoAtual.itens = [];
                pedidoAtual.total = 0;
                renderizarPedido();
            });
        }
    }
}

renderizarProdutos();