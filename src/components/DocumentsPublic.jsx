import React, { useState, useEffect } from 'react';

const DocumentsPublic = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // API endpoint pentru documentele publice
  const DOCUMENTS_API = '/admin/documents_admin_api.php';

  // Categorii pentru filtrare
  const categories = {
    all: 'Toate documentele',
    ghiduri: '📖 Ghiduri și Tutoriale',
    formulare: '📋 Formulare',
    resurse: '📚 Resurse Educaționale',
    checklist: '✅ Checklist-uri',
    general: '📁 General'
  };

  // Încarcă documentele la mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  // Funcție pentru încărcarea documentelor
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(DOCUMENTS_API, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        // Filtrează doar documentele active
        const activeDocuments = data.data || [];
        setDocuments(activeDocuments);
        console.log('✅ Documente încărcate:', activeDocuments.length);
      } else {
        throw new Error(data.error || 'Eroare la încărcarea documentelor');
      }
    } catch (err) {
      console.error('❌ Eroare fetch documente:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Funcție pentru formatarea dimensiunii fișierului
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Funcție pentru obținerea iconului documentului
  const getDocumentIcon = (fileType) => {
    if (!fileType) return '📋';
    const type = fileType.toLowerCase();
    
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('msword')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('powerpoint') || type.includes('presentation')) return '📊';
    if (type.includes('image')) return '🖼️';
    if (type.includes('text')) return '📃';
    
    return '📋';
  };

  // Funcție pentru descărcarea documentului
  const downloadDocument = async (documentId, filename) => {
    try {
      // Aici vei implementa logica de descărcare
      // Pentru moment, afișăm un mesaj
      console.log('Descărcare document:', documentId, filename);
      
      // Implementare simplă - redirect către fișier
      // const downloadUrl = `/uploads/documents/${document.stored_filename}`;
      // window.open(downloadUrl, '_blank');
      
      alert(`Descărcare ${filename} - Funcționalitatea va fi implementată complet.`);
    } catch (error) {
      console.error('Eroare la descărcare:', error);
      alert('Eroare la descărcarea documentului');
    }
  };

  // Filtrează documentele pe baza categoriei selectate
  const filteredDocuments = selectedCategory === 'all' 
    ? documents 
    : documents.filter(doc => doc.category === selectedCategory);

  // Grupează documentele - featured la început
  const featuredDocuments = filteredDocuments.filter(doc => doc.is_featured);
  const regularDocuments = filteredDocuments.filter(doc => !doc.is_featured);
  const sortedDocuments = [...featuredDocuments, ...regularDocuments];

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-white to-amber-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#b06b4c]"></div>
            <p className="mt-4 text-gray-600">Se încarcă documentele...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-white to-amber-50">
        <div className="container mx-auto px-6">
          <div className="text-center bg-red-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-xl font-bold text-red-600 mb-2">Eroare la încărcarea documentelor</h3>
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={fetchDocuments}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Încearcă din nou
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white to-amber-50">
      <div className="container mx-auto px-6">
        {/* Header secțiune */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#b06b4c] mb-4">
            📁 Documentele Tale
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descarcă toate resursele de care ai nevoie pentru o călătorie liniștită în alăptare
          </p>
        </div>

        {/* Filtre categorii */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === key
                  ? 'bg-[#b06b4c] text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-[#b06b4c] shadow-md'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Statistici rapide */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-2xl font-bold text-[#b06b4c] mb-1">{documents.length}</div>
            <div className="text-gray-600 text-sm">Total documente</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {documents.filter(doc => doc.is_free).length}
            </div>
            <div className="text-gray-600 text-sm">Gratuite</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
            <div className="text-2xl font-bold text-amber-600 mb-1">
              {documents.filter(doc => doc.is_featured).length}
            </div>
            <div className="text-gray-600 text-sm">Recomandate</div>
          </div>
        </div>

        {/* Lista documentelor */}
        {sortedDocuments.length === 0 ? (
          <div className="text-center bg-gray-50 rounded-2xl p-12 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              {selectedCategory === 'all' ? 'Nu există documente încă' : 'Nu există documente în această categorie'}
            </h3>
            <p className="text-gray-500">
              {selectedCategory === 'all' 
                ? 'Documentele vor apărea aici după ce sunt adăugate de administrator.'
                : 'Încearcă să selectezi o altă categorie sau toate documentele.'
              }
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedDocuments.map((document, index) => (
              <div
                key={document.id}
                className={`bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 relative overflow-hidden ${
                  document.is_featured ? 'ring-2 ring-amber-400' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Badge pentru featured */}
                {document.is_featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ⭐ RECOMANDAT
                  </div>
                )}

                {/* Badge pentru preț */}
                <div className="absolute top-4 left-4">
                  {document.is_free ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      💚 GRATUIT
                    </span>
                  ) : (
                    <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      💰 {document.price || 0} RON
                    </span>
                  )}
                </div>

                {/* Iconul documentului */}
                <div className="text-center mb-6 mt-8">
                  <div className="text-6xl mb-4 transform hover:scale-110 transition-transform">
                    {getDocumentIcon(document.file_type)}
                  </div>
                  <h3 className="text-xl font-bold text-[#b06b4c] mb-2 leading-tight">
                    {document.title}
                  </h3>
                  {document.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {document.description}
                    </p>
                  )}
                </div>

                {/* Detalii fișier */}
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                      {document.formatted_size || formatFileSize(document.file_size)}
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                      {document.file_type?.split('/')[1]?.toUpperCase() || 'PDF'}
                    </span>
                  </div>
                  {document.downloads_count > 0 && (
                    <div className="text-xs text-gray-400">
                      📥 {document.downloads_count} descărcări
                    </div>
                  )}
                </div>

                {/* Buton descărcare */}
                <button
                  onClick={() => downloadDocument(document.id, document.original_filename)}
                  className="w-full bg-gradient-to-r from-[#b06b4c] to-amber-600 hover:from-amber-600 hover:to-[#b06b4c] text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Descarcă
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Call to action final */}
        {sortedDocuments.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-amber-100 to-rose-100 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-[#b06b4c] mb-4">
                🌟 Ai găsit ceea ce căutai?
              </h3>
              <p className="text-gray-700 mb-6">
                Dacă ai întrebări despre documentele descărcate sau ai nevoie de consultanță personalizată, 
                sunt aici să te ajut!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-[#b06b4c] hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
                  📞 Programează o consultație
                </button>
                <button className="bg-white hover:bg-gray-50 text-[#b06b4c] font-bold py-3 px-8 rounded-full border-2 border-[#b06b4c] transition-colors">
                  💬 Contactează-mă
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DocumentsPublic;