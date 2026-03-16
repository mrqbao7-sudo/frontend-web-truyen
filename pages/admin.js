import { useEffect, useState } from 'react';

export default function Admin() {
  const [chapters, setChapters] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editTitle, setEditTitle] = useState(''); // Thêm bộ nhớ cho Tiêu đề

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/api/truyen`)
        .then(res => res.json())
        .then(data => setChapters(data));
    }
  }, []);

  const handleSave = async (id) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      await fetch(`${apiUrl}/api/chapters/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        // Gửi cả tiêu đề và nội dung lên Backend
        body: JSON.stringify({ title: editTitle, content: editContent }) 
      });
      alert('Đã lưu chỉnh sửa thành công!');
      setEditId(null);
      window.location.reload(); 
    } catch (error) {
      alert('Có lỗi khi lưu!');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>⚙️ Dashboard Quản Trị Tác Giả</h1>
      
      {chapters.map(chap => (
        <div key={chap.id} style={{ border: '1px solid #ccc', margin: '20px 0', padding: '20px', borderRadius: '8px', backgroundColor: '#fdfdfd' }}>
          
          {editId === chap.id ? (
            <div>
              <label style={{fontWeight: 'bold'}}>Tiêu đề chương:</label>
              <input 
                style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '15px', border: '2px solid #3498db', borderRadius: '5px' }}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <label style={{fontWeight: 'bold'}}>Nội dung:</label>
              <textarea 
                style={{ width: '100%', height: '300px', padding: '15px', fontSize: '16px', lineHeight: '1.6', border: '2px solid #3498db', borderRadius: '5px' }}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div style={{ marginTop: '15px' }}>
                <button onClick={() => handleSave(chap.id)} style={{ padding: '10px 20px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>💾 Lưu Thay Đổi</button>
                <button onClick={() => setEditId(null)} style={{ padding: '10px 20px', marginLeft: '15px', background: '#95a5a6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>❌ Hủy bỏ</button>
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ color: '#2c3e50', marginTop: 0 }}>{chap.title}</h3>
              <p style={{ whiteSpace: 'pre-wrap', maxHeight: '100px', overflow: 'hidden', color: '#555', borderLeft: '3px solid #eee', paddingLeft: '10px' }}>
                {chap.content}
              </p>
              <button onClick={() => { setEditId(chap.id); setEditContent(chap.content); setEditTitle(chap.title); }} style={{ padding: '8px 15px', background: '#2980b9', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
                ✏️ Chỉnh sửa chương này
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
