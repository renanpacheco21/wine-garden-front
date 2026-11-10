import { useEffect, useMemo, useState, type FormEvent } from 'react'
import {
  ArrowDownWideNarrow,
  Check,
  ChevronDown,
  Heart,
  ImagePlus,
  MapPin,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  Wine as WineIcon,
  X,
} from 'lucide-react'
import './App.css'

type WineColor = 'Tinto' | 'Branco' | 'Rosé' | 'Espumante'
type Sweetness = 'Seco' | 'Meio-seco' | 'Demi-sec' | 'Suave' | 'Doce' | 'A confirmar' | 'A confirmar (seco ou demi-sec)'

type Wine = {
  id: string
  name: string
  winery: string
  region: string
  country: string
  color: WineColor
  sweetness: Sweetness
  grapes: string
  alcohol: string
  vintage: string
  image: string
  favorite: boolean
}

type WineDraft = Omit<Wine, 'id' | 'favorite'>

const sampleWines: Wine[] = [
  {
    id: 'catalog-01',
    name: 'Margherita Goethe',
    winery: 'Quarezemin',
    region: 'Vales da Uva Goethe – SC',
    country: 'Brasil',
    color: 'Branco',
    sweetness: 'A confirmar (seco ou demi-sec)',
    grapes: 'Goethe',
    alcohol: '11,5%',
    vintage: 'Não safrado',
    image: '/wines/margherita-goethe.jpg',
    favorite: false,
  },
  {
    id: 'catalog-02',
    name: 'Naturelle Tinto',
    winery: 'Casa Valduga',
    region: 'Vale dos Vinhedos – RS',
    country: 'Brasil',
    color: 'Tinto',
    sweetness: 'Suave',
    grapes: 'Cabernet Sauvignon, Merlot e Marselan',
    alcohol: '11,5%',
    vintage: 'Não safrado',
    image: '/wines/naturelle-tinto.jpg',
    favorite: false,
  },
  {
    id: 'catalog-03',
    name: 'Cordero con Piel de Lobo Malbec Rosé',
    winery: 'Mosquita Muerta',
    region: 'Mendoza',
    country: 'Argentina',
    color: 'Rosé',
    sweetness: 'Seco',
    grapes: 'Malbec',
    alcohol: '13,2%',
    vintage: '2024',
    image: '/wines/cordero-rose.jpg',
    favorite: false,
  },
  {
    id: 'catalog-04',
    name: 'Cordero con Piel de Lobo Cabernet Sauvignon',
    winery: 'Mosquita Muerta',
    region: 'Mendoza',
    country: 'Argentina',
    color: 'Tinto',
    sweetness: 'Seco',
    grapes: 'Cabernet Sauvignon',
    alcohol: '13–13,5%',
    vintage: 'Não identificada',
    image: '/wines/cordero-cabernet.jpg',
    favorite: false,
  },
  {
    id: 'catalog-05',
    name: 'Casillero del Diablo Dark Red',
    winery: 'Concha y Toro',
    region: 'Vale do Maule',
    country: 'Chile',
    color: 'Tinto',
    sweetness: 'A confirmar',
    grapes: 'Blend de uvas tintas',
    alcohol: '13,5%',
    vintage: 'Não identificada',
    image: '/wines/casillero-dark-red.jpg',
    favorite: false,
  },
  {
    id: 'catalog-06',
    name: 'Fausto Cabernet Sauvignon',
    winery: 'Pizzato',
    region: 'Serra Gaúcha – RS',
    country: 'Brasil',
    color: 'Tinto',
    sweetness: 'Seco',
    grapes: 'Cabernet Sauvignon',
    alcohol: '13,5%',
    vintage: '2024',
    image: '/wines/fausto-cabernet.jpg',
    favorite: false,
  },
  {
    id: 'catalog-07',
    name: 'Perro Callejero Cabernet Sauvignon',
    winery: 'Mosquita Muerta',
    region: 'Mendoza',
    country: 'Argentina',
    color: 'Tinto',
    sweetness: 'Seco',
    grapes: 'Cabernet Sauvignon',
    alcohol: '13,3%',
    vintage: '2023',
    image: '/wines/perro-callejero.png',
    favorite: false,
  },
  {
    id: 'catalog-08',
    name: 'Thera Madai',
    winery: 'Vinícola Thera',
    region: 'Serra Catarinense – SC',
    country: 'Brasil',
    color: 'Tinto',
    sweetness: 'Seco',
    grapes: 'Merlot, Cabernet Franc, Malbec e Syrah',
    alcohol: '13%',
    vintage: '2024',
    image: '/wines/thera-madai.png',
    favorite: false,
  },
]

const colorOptions: WineColor[] = ['Tinto', 'Branco', 'Rosé', 'Espumante']
const sweetnessOptions: Sweetness[] = ['Seco', 'Meio-seco', 'Demi-sec', 'Suave', 'Doce', 'A confirmar', 'A confirmar (seco ou demi-sec)']
const storageKey = 'wine-garden-collection'
const legacySampleIds = new Set(['sample-1', 'sample-2', 'sample-3', 'sample-4', 'sample-5', 'sample-6'])
const catalogVersionKey = 'wine-garden-catalog-version'
const catalogVersion = '3'

const emptyDraft: WineDraft = {
  name: '',
  winery: '',
  region: '',
  country: '',
  color: 'Tinto',
  sweetness: 'Seco',
  grapes: '',
  alcohol: '',
  vintage: '',
  image: '',
}

function readWines(): Wine[] {
  try {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return sampleWines
    const storedWines = JSON.parse(saved) as Wine[]
    if (!Array.isArray(storedWines)) return sampleWines
    const catalogImages = new Map(sampleWines.map((wine) => [wine.id, wine.image]))
    const migratedWines = storedWines.map((wine) => {
      const localImage = catalogImages.get(wine.id)
      return localImage && /^https?:\/\//.test(wine.image)
        ? { ...wine, image: localImage }
        : wine
    })
    if (migratedWines.some((wine) => legacySampleIds.has(wine.id))) {
      const personalWines = migratedWines.filter((wine) => !legacySampleIds.has(wine.id))
      return [...sampleWines, ...personalWines]
    }
    if (localStorage.getItem(catalogVersionKey) !== catalogVersion && !migratedWines.some((wine) => wine.id === 'catalog-08')) {
      const madai = sampleWines.find((wine) => wine.id === 'catalog-08')
      return madai ? [...migratedWines, madai] : migratedWines
    }
    return migratedWines
  } catch {
    return sampleWines
  }
}

function WineCard({
  wine,
  onFavorite,
  onEdit,
}: {
  wine: Wine
  onFavorite: (id: string) => void
  onEdit: (wine: Wine) => void
}) {
  return (
    <article className="wine-card">
      <div className={`wine-card__image wine-card__image--${wine.color.toLowerCase()}`}>
        {wine.image ? <img src={wine.image} alt={`${wine.name}, de ${wine.winery}`} /> : <WineIcon size={42} strokeWidth={1.2} />}
        <span className={`wine-tag wine-tag--${wine.color.toLowerCase()}`}>{wine.color}</span>
        <button
          className={`icon-button favorite-button${wine.favorite ? ' is-favorite' : ''}`}
          type="button"
          aria-label={wine.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={wine.favorite}
          onClick={() => onFavorite(wine.id)}
        >
          <Heart size={17} fill={wine.favorite ? 'currentColor' : 'none'} />
        </button>
        <button className="photo-edit" type="button" onClick={() => onEdit(wine)} aria-label={`Editar ${wine.name}`}>
          Editar vinho
        </button>
      </div>
      <div className="wine-card__body">
        <div className="wine-card__heading">
          <div>
            <p className="wine-card__winery">{wine.winery}</p>
            <h3>{wine.name}</h3>
          </div>
          <span className="wine-vintage">{wine.vintage || 'NV'}</span>
        </div>
        <p className="wine-origin"><MapPin size={14} /> {wine.region}, {wine.country}</p>
        <p className="wine-grapes">Uvas <span>{wine.grapes || 'Não informadas'}</span></p>
        <div className="wine-card__footer">
          <span className="wine-sweetness"><span className="sweetness-dot" /> {wine.sweetness}</span>
          <span className="wine-alcohol">{wine.alcohol || 'Álcool não informado'}</span>
          <button className="wine-card__open" type="button" onClick={() => onEdit(wine)}>Abrir ficha <span aria-hidden="true">↗</span></button>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [wines, setWines] = useState<Wine[]>(readWines)
  const [activeColor, setActiveColor] = useState('Todos')
  const [sweetness, setSweetness] = useState('Todas as doçuras')
  const [query, setQuery] = useState('')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [sortOrder, setSortOrder] = useState('recentes')
  const [editingWine, setEditingWine] = useState<Wine | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [draft, setDraft] = useState<WineDraft>(emptyDraft)
  const [storageWarning, setStorageWarning] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(wines))
      localStorage.setItem(catalogVersionKey, catalogVersion)
    } catch {
      console.warn('Não foi possível migrar a coleção armazenada neste navegador.')
    }
  }, [wines])

  function updateWines(updater: (current: Wine[]) => Wine[]) {
    const updatedWines = updater(wines)
    setWines(updatedWines)
    try {
      localStorage.setItem(storageKey, JSON.stringify(updatedWines))
      setStorageWarning(false)
    } catch {
      setStorageWarning(true)
    }
  }

  const visibleWines = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')
    return wines
      .filter((wine) => activeColor === 'Todos' || wine.color === activeColor)
      .filter((wine) => sweetness === 'Todas as doçuras' || wine.sweetness === sweetness)
      .filter((wine) => !favoritesOnly || wine.favorite)
      .filter((wine) => !normalizedQuery || [wine.name, wine.winery, wine.region, wine.country, wine.grapes]
        .some((value) => value.toLocaleLowerCase('pt-BR').includes(normalizedQuery)))
      .sort((first, second) => {
        if (sortOrder === 'nome') return first.name.localeCompare(second.name, 'pt-BR')
        return sortOrder === 'antigos'
          ? Number(first.vintage || 0) - Number(second.vintage || 0)
          : Number(second.vintage || 0) - Number(first.vintage || 0)
      })
  }, [activeColor, favoritesOnly, query, sortOrder, sweetness, wines])

  const favoriteCount = wines.filter((wine) => wine.favorite).length
  const countries = new Set(wines.map((wine) => wine.country)).size

  function openNewWine() {
    setEditingWine(null)
    setConfirmDelete(false)
    setDraft(emptyDraft)
    setIsFormOpen(true)
  }

  function openEditWine(wine: Wine) {
    setEditingWine(wine)
    setConfirmDelete(false)
    setDraft({
      name: wine.name,
      winery: wine.winery,
      region: wine.region,
      country: wine.country,
      color: wine.color,
      sweetness: wine.sweetness,
      grapes: wine.grapes || '',
      alcohol: wine.alcohol || '',
      vintage: wine.vintage,
      image: wine.image,
    })
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
    setEditingWine(null)
    setConfirmDelete(false)
  }

  function deleteWine() {
    if (!editingWine) return
    updateWines((current) => current.filter((wine) => wine.id !== editingWine.id))
    closeForm()
  }

  function saveWine(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (editingWine) {
      updateWines((current) => current.map((wine) => wine.id === editingWine.id ? { ...wine, ...draft } : wine))
    } else {
      updateWines((current) => [{ ...draft, id: crypto.randomUUID(), favorite: false }, ...current])
    }
    closeForm()
  }

  function toggleFavorite(id: string) {
    updateWines((current) => current.map((wine) => wine.id === id ? { ...wine, favorite: !wine.favorite } : wine))
  }

  async function handlePhoto(file?: File) {
    if (!file) return
    if (!file.type.startsWith('image/')) return
    try {
      const bitmap = await createImageBitmap(file)
      const scale = Math.min(1, 1000 / Math.max(bitmap.width, bitmap.height))
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(bitmap.width * scale)
      canvas.height = Math.round(bitmap.height * scale)
      const context = canvas.getContext('2d')
      context?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
      setDraft((current) => ({ ...current, image: canvas.toDataURL('image/jpeg', 0.78) }))
      bitmap.close()
    } catch {
      setStorageWarning(true)
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#inicio" aria-label="Adega, início">
          <span className="brand-mark"><WineIcon size={19} strokeWidth={1.7} /></span>
          <span>adega<span className="brand-period">.</span></span>
        </a>
        <nav className="top-nav" aria-label="Navegação principal">
          <a className="top-nav__link is-active" href="#colecao">Vinhos</a>
          <button className={`top-nav__link${favoritesOnly ? ' is-active' : ''}`} type="button" onClick={() => setFavoritesOnly((value) => !value)}>
            Favoritos <span className="nav-count">{favoriteCount}</span>
          </button>
        </nav>
        <button className="button button--primary topbar__add" type="button" onClick={openNewWine}>
          <Plus size={17} /> <span>Novo vinho</span>
        </button>
      </header>

      <main id="inicio">
        <section className="intro" aria-labelledby="page-title">
          <div className="intro__copy">
            <p className="eyebrow"><span className="eyebrow-line" /> CADERNO DE DEGUSTAÇÕES</p>
            <h1 id="page-title">Toda taça guarda<br />uma <em>história.</em></h1>
            <p className="intro__description">Um lugar para lembrar dos vinhos que fizeram cada momento especial.</p>
            <button className="text-link" type="button" onClick={openNewWine}>Registrar uma degustação <span aria-hidden="true">↗</span></button>
          </div>
          <div className="intro__visual">
            <img src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1500&q=88" alt="Taça de vinho tinto em uma mesa posta" />
            <div className="intro__image-label"><span>NOTAS PESSOAIS</span><strong>Memórias que ficam.</strong></div>
            <div className="intro__stamp"><span>EST.</span><strong>20<br />24</strong></div>
          </div>
        </section>

        <section className="collection" id="colecao" aria-labelledby="collection-title">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">SEU ACERVO, SEU PALADAR</p>
              <h2 id="collection-title">Nossa adega</h2>
            </div>
            <div className="collection-stats">
              <div><strong>{wines.length}</strong><span>rótulos</span></div>
              <span className="stats-divider" />
              <div><strong>{countries.toString().padStart(2, '0')}</strong><span>países</span></div>
            </div>
          </div>

          <div className="collection-tools">
            <div className="color-tabs" role="tablist" aria-label="Filtrar por cor">
              {['Todos', ...colorOptions].map((color) => (
                <button
                  className={`color-tab${activeColor === color ? ' is-active' : ''}`}
                  key={color}
                  type="button"
                  role="tab"
                  aria-selected={activeColor === color}
                  onClick={() => setActiveColor(color)}
                >
                  {color !== 'Todos' && <span className={`tab-dot tab-dot--${color.toLowerCase()}`} />}
                  {color}
                </button>
              ))}
            </div>
            <div className="tool-actions">
              <label className="search-box">
                <Search size={16} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar vinho, região..." aria-label="Buscar vinho ou região" />
                {query && <button type="button" aria-label="Limpar busca" onClick={() => setQuery('')}><X size={14} /></button>}
              </label>
              <button className={`filter-button${showFilters ? ' is-active' : ''}`} type="button" onClick={() => setShowFilters((value) => !value)} aria-expanded={showFilters}>
                <SlidersHorizontal size={15} /> <span>Filtrar</span><ChevronDown size={14} />
              </button>
              <label className="sort-select"><ArrowDownWideNarrow size={15} /><select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Ordenar vinhos"><option value="recentes">Safra recente</option><option value="antigos">Safra antiga</option><option value="nome">Nome A–Z</option></select></label>
            </div>
          </div>

          {showFilters && (
            <div className="filter-panel">
              <label>Doçura<select value={sweetness} onChange={(event) => setSweetness(event.target.value)}><option>Todas as doçuras</option>{sweetnessOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
              <button className="filter-reset" type="button" onClick={() => { setSweetness('Todas as doçuras'); setFavoritesOnly(false) }}>Limpar filtros</button>
            </div>
          )}

          <div className="results-line"><span>{visibleWines.length} {visibleWines.length === 1 ? 'vinho encontrado' : 'vinhos encontrados'}</span>{favoritesOnly && <span className="active-filter">Favoritos <button type="button" onClick={() => setFavoritesOnly(false)} aria-label="Remover filtro de favoritos"><X size={12} /></button></span>}</div>

          {visibleWines.length > 0 ? (
            <div className="wine-grid">
              {visibleWines.map((wine, index) => <div className="wine-card-wrap" key={wine.id} style={{ animationDelay: `${index * 55}ms` }}><WineCard wine={wine} onFavorite={toggleFavorite} onEdit={openEditWine} /></div>)}
            </div>
          ) : (
            <div className="empty-state"><span className="empty-state__icon"><WineIcon size={25} /></span><h3>Nenhum vinho por aqui</h3><p>Tente mudar os filtros ou registre uma nova degustação.</p><button className="button button--outline" type="button" onClick={openNewWine}><Plus size={16} /> Adicionar vinho</button></div>
          )}
        </section>
      </main>

      <footer className="footer"><span>adega<span className="brand-period">.</span></span><span>Feito para guardar bons momentos.</span><span>SEU CADERNO DE VINHOS</span></footer>

      {storageWarning && <div className="storage-notice" role="status">Não foi possível guardar os dados. Remova algumas fotos ou use imagens menores.<button type="button" aria-label="Fechar aviso" onClick={() => setStorageWarning(false)}><X size={16} /></button></div>}

      {isFormOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeForm() }}>
          <section className="wine-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-header"><div><p className="eyebrow">CADERNO DE DEGUSTAÇÕES</p><h2 id="modal-title">{editingWine ? 'Editar rótulo' : 'Novo rótulo'}</h2></div><button className="icon-button modal-close" type="button" onClick={closeForm} aria-label="Fechar"><X size={19} /></button></div>
            <form onSubmit={saveWine}>
              <label className="photo-picker">
                {draft.image ? <img src={draft.image} alt="Prévia do rótulo" /> : <span className="photo-picker__placeholder"><ImagePlus size={22} /><span>Adicionar foto do rótulo</span><small>JPG ou PNG · otimizada automaticamente</small></span>}
                <input type="file" accept="image/*" onChange={(event) => handlePhoto(event.target.files?.[0])} />
                {draft.image && <span className="photo-picker__change"><ImagePlus size={14} /> Trocar foto</span>}
              </label>
              <div className="form-grid">
                <label className="form-field form-field--wide">Nome do vinho<input required autoFocus value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Ex.: Chianti Classico" /></label>
                <label className="form-field form-field--wide">Vinícola<input required value={draft.winery} onChange={(event) => setDraft({ ...draft, winery: event.target.value })} placeholder="Ex.: Castello di Ama" /></label>
                <label className="form-field form-field--wide">Uvas<input value={draft.grapes} onChange={(event) => setDraft({ ...draft, grapes: event.target.value })} placeholder="Ex.: Cabernet Sauvignon" /></label>
                <label className="form-field">Região<input required value={draft.region} onChange={(event) => setDraft({ ...draft, region: event.target.value })} placeholder="Ex.: Toscana" /></label>
                <label className="form-field">País<input required value={draft.country} onChange={(event) => setDraft({ ...draft, country: event.target.value })} placeholder="Ex.: Itália" /></label>
                <label className="form-field">Cor<select value={draft.color} onChange={(event) => setDraft({ ...draft, color: event.target.value as WineColor })}>{colorOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                <label className="form-field">Doçura<select value={draft.sweetness} onChange={(event) => setDraft({ ...draft, sweetness: event.target.value as Sweetness })}>{sweetnessOptions.map((option) => <option key={option}>{option}</option>)}</select></label>
                <label className="form-field">Safra<input value={draft.vintage} onChange={(event) => setDraft({ ...draft, vintage: event.target.value.slice(0, 24) })} placeholder="Ex.: 2022 ou Não safrado" /></label>
                <label className="form-field">Teor alcoólico<input value={draft.alcohol} onChange={(event) => setDraft({ ...draft, alcohol: event.target.value.slice(0, 16) })} placeholder="Ex.: 13,5%" /></label>
              </div>
              <div className="modal-actions">
                {editingWine && (confirmDelete
                  ? <div className="delete-confirm"><span>Excluir este vinho?</span><button className="button button--quiet" type="button" onClick={() => setConfirmDelete(false)}>Manter</button><button className="button button--danger" type="button" onClick={deleteWine}>Confirmar</button></div>
                  : <button className="button button--danger modal-delete" type="button" onClick={() => setConfirmDelete(true)}><Trash2 size={15} /> Excluir</button>)}
                <button className="button button--quiet" type="button" onClick={closeForm}>Cancelar</button>
                <button className="button button--primary" type="submit"><Check size={16} /> {editingWine ? 'Salvar alterações' : 'Guardar vinho'}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
