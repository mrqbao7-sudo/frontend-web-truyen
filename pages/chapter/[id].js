import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ReadingPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [data, setData] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(20);

  // Tải dữ liệu chương mỗi khi ID thay đổi
  useEffect(() => {
    if (id) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      fetch(`${apiUrl}/api/chapters/${id}`)
        .then(res => res.json())
        .then(resData => {
          setData(resData);
          window.scrollTo(0, 0); // Cuộn lên đầu trang khi sang chương mới
        });
    }
  }, [id]);

  if (!data) return <div style={{ textAlign: 'center', padding: '50px' }}>Đang tải nội dung...</div>;

  const { current, prevId, nextId } = data;

  // Cấu hình màu sắc theo Dark Mode
  const bgColors = darkMode ? { body: '#121212', paper: '#1e1e1e', text: '#e0e0e0', toolbar: '#2c2c2c' } 
                            : { body: '#f4f4f4', paper: '#ffffff', text: '#222222', toolbar: '#e9ecef' };

  return (
    <div style={{ backgroundColor: bgColors.body, minHeight: '100vh', padding: '20px 0', transition: '0.3s' }}>
      
      {/* Khung giấy đọc truyện */}
      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: bgColors.paper, padding: '40px 60px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: '0.3s' }}>
        
        {/* Thanh công cụ (Toolbar) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: `1px solid ${darkMode ? '#444' : '#eee'}`, marginBottom: '40px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>
            🏠 Về trang chủ
          </Link>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '8px 15px', borderRadius: '20px', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: bgColors.toolbar, color: bgColors.text }}>
              {darkMode ? '☀️ Giao diện Sáng' : '🌙 Giao diện Tối'}
            </button>
            <div style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '20px', overflow: 'hidden' }}>
              <button onClick={() => setFontSize(fontSize - 2)} style={{ padding: '8px 15px', border: 'none', borderRight: '1px solid #ccc', cursor: 'pointer', backgroundColor: bgColors.toolbar, color: bgColors.text }}>A-</button>
              <button onClick={() => setFontSize(fontSize + 2)} style={{ padding: '8px 15px', border: 'none', cursor: 'pointer', backgroundColor: bgColors.toolbar, color: bgColors.text }}>A+</button>
            </div>
          </div>
        </div>

        {/* Tiêu đề & Nội dung */}
        <h1 style={{ textAlign: 'center', fontSize: '36px', color: bgColors.text, marginBottom: '50px' }}>
          {current.title}
        </h1>
        
        <div style={{ fontSize: `${fontSize}px`, lineHeight: '1.8', color: bgColors.text, whiteSpace: 'pre-wrap', textAlign: 'justify' }}>
          {current.content}
        </div>

        {/* Nút chuyển chương */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '60px', paddingTop: '30px', borderTop: `1px solid ${darkMode ? '#444' : '#eee'}` }}>
          {prevId ? (
            <Link href={`/chapter/${prevId}`} style={{ textDecoration: 'none' }}>
              <button style={{ padding: '12px 30px', fontSize: '16px', backgroundColor: '#34495e', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>⬅️ Chương Trước</button>
            </Link>
          ) : (
             <button disabled style={{ padding: '12px 30px', fontSize: '16px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '30px', cursor: 'not-allowed', opacity: 0.5 }}>⬅️ Chương Trước</button>
          )}

          {nextId ? (
            <Link href={`/chapter/${nextId}`} style={{ textDecoration: 'none' }}>
               <button style={{ padding: '12px 30px', fontSize: '16px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '30px', cursor: 'pointer' }}>Chương Sau ➡️</button>
            </Link>
          ) : (
            <button disabled style={{ padding: '12px 30px', fontSize: '16px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '30px', cursor: 'not-allowed', opacity: 0.5 }}>Chương Sau ➡️</button>
          )}
        </div>

      </div>
    </div>
  );
}
