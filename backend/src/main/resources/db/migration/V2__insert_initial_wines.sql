
ALTER TABLE wines
ALTER COLUMN safra TYPE VARCHAR(4)
USING safra::VARCHAR;

INSERT INTO wines (
    nome,
    vinicola,
    regiao,
    pais,
    cor,
    docura,
    uvas,
    safra,
    favorito,
    custo_beneficio,
    imagem_url
) VALUES

      (
          'Margherita Goethe',
          'Quarezemin',
          'Vales da Uva Goethe - SC',
          'Brasil',
          'BRANCO',
          'NAO_ESPECIFICADO',
          'Goethe',
          'N/A',
          FALSE,
          FALSE,
          '/wines/margherita-goethe.jpg'
      ),

      (
          'Naturelle Tinto',
          'Casa Valduga',
          'Vale dos Vinhedos - RS',
          'Brasil',
          'TINTO',
          'SUAVE',
          'Cabernet Sauvignon, Merlot e Marselan',
          'N/A',
          FALSE,
          FALSE,
          '/wines/naturelle-tinto.jpg'
      ),

      (
          'Cordero con Piel de Lobo Malbec Rosé',
          'Mosquita Muerta',
          'Mendoza',
          'Argentina',
          'ROSE',
          'SECO',
          'Malbec',
          '2024',
          FALSE,
          FALSE,
          '/wines/cordero-rose.jpg'
      ),

      (
          'Cordero con Piel de Lobo Cabernet Sauvignon',
          'Mosquita Muerta',
          'Mendoza',
          'Argentina',
          'TINTO',
          'SECO',
          'Cabernet Sauvignon',
          'N/A',
          FALSE,
          FALSE,
          '/wines/cordero-cabernet.jpg'
      ),

      (
          'Casillero del Diablo Dark Red',
          'Concha y Toro',
          'Vale do Maule',
          'Chile',
          'TINTO',
          'NAO_ESPECIFICADO',
          'Blend de uvas tintas',
          'N/A',
          FALSE,
          FALSE,
          '/wines/casillero-dark-red.jpg'
      ),

      (
          'Fausto Cabernet Sauvignon',
          'Pizzato',
          'Serra Gaúcha - RS',
          'Brasil',
          'TINTO',
          'SECO',
          'Cabernet Sauvignon',
          '2024',
          FALSE,
          FALSE,
          '/wines/fausto-cabernet.jpg'
      ),

      (
          'Perro Callejero Cabernet Sauvignon',
          'Mosquita Muerta',
          'Mendoza',
          'Argentina',
          'TINTO',
          'SECO',
          'Cabernet Sauvignon',
          '2023',
          FALSE,
          FALSE,
          '/wines/perro-callejero.png'
      ),

      (
          'Thera Madai',
          'Vinícola Thera',
          'Serra Catarinense - SC',
          'Brasil',
          'TINTO',
          'SECO',
          'Merlot, Cabernet Franc, Malbec e Syrah',
          '2024',
          FALSE,
          FALSE,
          '/wines/thera-madai.png'
      );
