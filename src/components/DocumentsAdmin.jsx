// DocumentsAdmin.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const DocumentsAdmin = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    is_featured: false
  });

  const API_BASE = '/documents_admin_api.php';

  const categories = [
    { value: 'general', label: 'General' },
    { value: 'ghiduri', label: 'Ghiduri' },
    { value: 'formulare', label: 'Formulare' },
    { value: 'resurse', label: 'Resurse' },
    { value: 'exercitii', label: 'Exerciții' },
    { value: 'planuri', label: 'Planuri Alimentare' }
  ];

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE);
      if (response.data.success) {
        setDocuments(response.data.data);
      }
    } catch (error) {
      console.error('Eroare la încărcarea documentelor:', error);
      showAlert('Eroare la încărcarea documentelor', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    
    // Validare tip fișier
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      showAlert('Tipul de fișier nu este permis', 'error');
      return;
    }
    
    // Validare dimensiune (10MB)
    if (file.size > 10 * 1024 * 1024) {
      showAlert('Fișierul este prea mare. Dimensiunea maximă este 10MB', 'error');
      return;
    }
    
    setSelectedFile(file);
    
    // Auto-completează titlul dacă este gol
    if (!formData.title) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setFormData(prev => ({ ...prev, title: nameWithoutExt }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      showAlert('Selectează un fișier pentru încărcare', 'error');
      return;
    }
    
    if (!formData.title.trim()) {
      showAlert('Titlul documentului este obligatoriu', 'error');
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    
    const uploadData = new FormData();
    uploadData.append('document', selectedFile);
    uploadData.append('title', formData.title);
    uploadData.append('description', formData.description);
    uploadData.append('category', formData.category);
    uploadData.append('is_featured', formData.is_featured.toString());
    
    try {
      const response = await axios.post(API_BASE, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        }
      });
      
      if (response.data.success) {
        showAlert('Document încărcat cu succes!', 'success');
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: 'general',
          is_featured: false
        });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Reload documents și switch la lista
        await loadDocuments();
        setTimeout(() => setActiveTab('list'), 1500);
      } else {
        showAlert(response.data.error || 'Eroare la încărcarea documentului', 'error');
      }
    } catch (error) {
      console.error('Upload error:', error);
      showAlert('Eroare de conexiune la încărcarea documentului', 'error');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ești sigură că vrei să ștergi acest document?')) {
      return;
    }
    
    try {
      const response = await axios.delete(`${API_BASE}?id=${id}`);
      if (response.data.success) {
        showAlert('Document șters cu succes', 'success');
        await loadDocuments();
      } else {
        showAlert(response.data.error || 'Eroare la ștergerea documentului', 'error');
      }
    } catch (error) {
      console.error('Delete error:', error);
      showAlert('Eroare de conexiune la ștergerea documentului', 'error');
    }
  };

  const handleTestDownload = (id) => {
    window.open(`${API_BASE}?download=1&id=${id}`, '_blank');
  };

  const getDocumentIcon = (fileType) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('excel') || fileType.includes('sheet')) return '📊';
    if (fileType.includes('image')) return '🖼️';
    return '📋';
  };

  const getDocumentIconColor = (fileType) => {
    if (fileType.includes('pdf')) return 'bg-red-500';
    if (fileType.includes('word') || fileType.includes('document')) return 'bg-blue-500';
    if (fileType.includes('excel') || fileType.includes('sheet')) return 'bg-green-500';
    if (fileType.includes('image')) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const showAlert = (message, type) => {
    // Implementează sistemul de alerte (poți folosi toast sau state)
    console.log(`${type.toUpperCase()}: ${message}`);
    // Pentru o implementare completă, adaugă un sistem de toast
  };

  const formatFileSize = (bytes) => {
    if (bytes >= 1073741824) {
      return (bytes / 1073741824).toFixed(2) + ' GB';
    } else if (bytes >= 1048576) {
      return (bytes / 1048576).toFixed(2) + ' MB';
    } else if (bytes >= 1024) {
      return (bytes / 1024).toFixed(2) + ' KB';
    } else {
      return bytes + ' bytes';
    }
  };

  return (
    <div className="documents-admin">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl p-6 mb-6 text-white">
        <h2 className="text-3xl font-bold mb-2">
          📁 Gestionare Documente
        </h2>
        <p className="text-teal-100">
          Încarcă și gestionează documentele pentru clienți
        </p>
      </div>

      {/* Statistici */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border">
          <div className="text-2xl font-bold text-teal-600">{documents.length}</div>
          <div className="text-gray-600">Total Documente</div>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <div className="text-2xl font-bold text-yellow-600">
            {documents.filter(doc => doc.is_featured).length}
          </div>
          <div className="text-gray-600">Recomandate</div>
        </div>
        <div className="bg-white p-4 rounded-xl border">
          <div className="text-2xl font-bold text-blue-600">
            {documents.reduce((sum, doc) => sum + doc.downloads_count, 0)}
          </div>
          <div className="text-gray-600">Total Descărcări</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex border-b">
          <button
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'upload'
                ? 'bg-teal-500 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            📤 Încarcă Document
          </button>
          <button
            className={`flex-1 px-6 py-4 font-semibold transition-colors ${
              activeTab === 'list'
                ? 'bg-teal-500 text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('list')}
          >
            📋 Toate Documentele ({documents.length})
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'upload' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upload Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleUpload}>
                  {/* Drop Zone */}
                  <div
                    className={`border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                      dragOver
                        ? 'border-teal-400 bg-teal-50'
                        : 'border-gray-300 hover:border-teal-400'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="text-6xl mb-4">
                      {selectedFile ? '✅' : '☁️'}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      {selectedFile ? 'Fișier Selectat' : 'Încarcă Document'}
                    </h3>
                    {selectedFile ? (
                      <div className="text-teal-600">
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-sm">({formatFileSize(selectedFile.size)})</p>
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        Trage fișierul aici sau fă click pentru a selecta
                      </p>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif,.webp"
                      onChange={(e) => handleFileSelect(e.target.files[0])}
                    />
                  </div>

                  {/* Progress Bar */}
                  {uploading && (
                    <div className="mt-4">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-center mt-2 text-sm text-gray-600">
                        Se încarcă... {uploadProgress}%
                      </p>
                    </div>
                  )}

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Titlul Documentului *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Ex: Ghid Alăptare pentru Începătoare"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descriere (opțional)
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Descrie documentul..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        {categories.map(cat => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          checked={formData.is_featured}
                          onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700">
                          ⭐ Document Recomandat
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading || !selectedFile}
                    className="w-full mt-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-teal-600 hover:to-cyan-600 transition-all"
                  >
                    {uploading ? (
                      <>
                        <span className="inline-block animate-spin mr-2">⏳</span>
                        Se încarcă...
                      </>
                    ) : (
                      <>📤 Încarcă Documentul</>
                    )}
                  </button>
                </form>
              </div>

              {/* Info Sidebar */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-teal-800 mb-4">
                  ℹ️ Informații Importante
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-teal-700 mb-2">📋 Tipuri Acceptate</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• PDF (ghiduri, formulare)</li>
                      <li>• Word (documente editabile)</li>
                      <li>• Excel (planuri, tabele)</li>
                      <li>• Imagini (JPEG, PNG, WebP)</li>
                      <li>• Text (resurse simple)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-teal-700 mb-2">⭐ Documente Recomandate</h4>
                    <p className="text-sm text-gray-600">
                      Vor apărea primul în lista pentru clienți și vor avea o iconiță specială.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-teal-700 mb-2">🔒 Securitate</h4>
                    <p className="text-sm text-gray-600">
                      Documentele sunt stocate securizat și accesibile doar pe site-ul tău.
                    </p>
                  </div>

                  <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      <strong>⚠️ Notă:</strong> Documentul va fi imediat disponibil pentru descărcare pe pagina principală.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'list' && (
            <div>
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin text-4xl mb-4">⏳</div>
                  <p className="text-gray-600">Se încarcă documentele...</p>
                </div>
              ) : documents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📁</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Nu există documente încă
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Adaugă primul document pentru a-l vedea aici
                  </p>
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="bg-teal-500 text-white px-6 py-3 rounded-xl hover:bg-teal-600 transition-colors"
                  >
                    📤 Adaugă Primul Document
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div
                      key={doc.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Document Icon */}
                        <div className={`w-16 h-16 ${getDocumentIconColor(doc.file_type)} rounded-xl flex items-center justify-center text-2xl text-white flex-shrink-0`}>
                          {getDocumentIcon(doc.file_type)}
                        </div>

                        {/* Document Info */}
                        <div className="flex-grow min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {doc.title}
                              </h3>
                              {doc.is_featured && (
                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                                  ⭐ Recomandat
                                </span>
                              )}
                              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                                {doc.category}
                              </span>
                            </div>
                          </div>

                          {doc.description && (
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {doc.description}
                            </p>
                          )}

                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span>📄 {doc.original_filename}</span>
                            <span>📦 {doc.formatted_size}</span>
                            <span>📅 {doc.created_at_formatted}</span>
                            {doc.downloads_count > 0 && (
                              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                                ⬇️ {doc.downloads_count}
                              </span>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleTestDownload(doc.id)}
                              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                              title="Test descărcare"
                            >
                              ⬇️ Test
                            </button>
                            <button
                              onClick={() => handleDelete(doc.id)}
                              className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                              title="Șterge document"
                            >
                              🗑️ Șterge
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default DocumentsAdmin;