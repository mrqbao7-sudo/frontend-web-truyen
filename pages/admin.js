import { useEffect, useState } from 'react';

export default function Admin() {
  const [chapters, setChapters] = useState([]);
  const [editId, setEditId] = useState(null); // Ghi nhớ xem đang sửa chương nào
  const [editContent, setEditContent] = useState(''); // Chứa nội dung đang sửa

  // Lấy danh sách truyện khi vừa vào trang
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/api/truyen`)
        .then(res => res.json())
        .then(data => setChapters(data));
    }
  }, []);

  // Hàm xử lý khi bấm nút Lưu
  const handleSave = async (id) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      await fetch(`${apiUrl}/api/chapters/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent }) // Gửi nội dung mới lên Backend
      });
      alert('Đã lưu chỉnh sửa thành công!');
      setEditId(null); // Đóng khung sửa
      window.location.reload(); // Tải lại trang để cập nhật nội dung mới
    } catch (error) {
      alert('Có lỗi khi lưu!');
    }
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>⚙️ Dashboard Quản Trị Tác Giả</h1>
      <p style={{ color: '#666' }}>Tại đây bạn có thể "mông má" lại những chương truyện do AI viết.</p>
      
      {chapters.map(chap => (
        <div key={chap.id} style={{ border: '1px solid #ccc', margin: '20px 0', padding: '20px', borderRadius: '8px', backgroundColor: '#fdfdfd' }}>
          <h3 style={{ color: '#2c3e50', marginTop: 0 }}>{chap.title}</h3>
          
          {/* Nếu đang ở chế độ sửa của chương này thì hiện khung nhập chữ */}
          {editId === chap.id ? (
            <div>
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
            /* Nếu không sửa thì chỉ hiện nội dung rút gọn và nút "Chỉnh sửa" */
            <div>
              <p style={{ whiteSpace: 'pre-wrap', maxHeight: '100px', overflow: 'hidden', color: '#555', borderLeft: '3px solid #eee', paddingLeft: '10px' }}>
                {chap.content}
              </p>
              <button onClick={() => { setEditId(chap.id); setEditContent(chap.content); }} style={{ padding: '8px 15px', background: '#2980b9', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
                ✏️ Chỉnh sửa chương này
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
