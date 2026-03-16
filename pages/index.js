import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Đang tìm Backend...');

  useEffect(() => {
    // Cố gắng kết nối với Backend của bạn
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      fetch(apiUrl)
        .then(res => res.text())
        .then(data => setMessage(data))
        .catch(err => setMessage('Lỗi: Chưa kết nối được Backend!'));
    } else {
      setMessage('Chưa thiết lập link Backend.');
    }
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Web Đọc Truyện</h1>
      <p style={{ textAlign: 'center', color: '#666' }}>Nơi khởi nguồn những câu chuyện bất tận.</p>
      
      <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>🔥 Truyện Đề Cử</h2>
        
        {/* Khung hiển thị 1 bộ truyện ví dụ */}
        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', marginTop: '10px', borderRadius: '5px' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#0056b3' }}>Kiếm Vực 3D Ngoại Truyện</h3>
          <p style={{ margin: 0, fontWeight: 'bold' }}>Tác giả: Bảo</p>
          <p style={{ fontSize: '15px', color: '#444', marginTop: '10px' }}>
            Chương 1: Khởi đầu mới tại đại lục... (AI đang soạn thảo)
          </p>
        </div>
        
      </div>

      <div style={{ marginTop: '40px', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '5px', textAlign: 'center' }}>
        <strong>Trạng thái hệ thống:</strong> {message}
      </div>
    </div>
  );
}
