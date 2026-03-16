import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/api/truyen`)
        .then(res => res.json())
        .then(data => {
          // Sắp xếp lại chương từ nhỏ đến lớn (Chương 1, 2, 3...)
          const sortedData = data.sort((a, b) => a.chapter_number - b.chapter_number);
          setChapters(sortedData);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div style={{ backgroundColor: '#f4f4f4', minHeight: '100vh', paddingBottom: '50px' }}>
      {/* Header đen chuẩn WuxiaWorld */}
      <div style={{ backgroundColor: '#1a1a1a', padding: '15px 0', textAlign: 'center' }}>
        <h1 style={{ color: '#fff', margin: 0, fontSize: '24px', textTransform: 'uppercase', letterSpacing: '2px' }}>Kiếm Vực 3D</h1>
      </div>

      <div style={{ maxWidth: '1000px', margin: '30px auto', display: 'flex', gap: '30px', padding: '0 20px' }}>
        
        {/* Cột trái: Ảnh bìa (dùng link ảnh tạm) */}
        <div style={{ flex: '0 0 250px' }}>
          <img src="https://via.placeholder.com/250x350/2c3e50/ffffff?text=Bia+Truyen" alt="Bìa truyện" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} />
        </div>

        {/* Cột phải: Thông tin & Mục lục */}
        <div style={{ flex: '1', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '32px', margin: '0 0 10px 0', color: '#222' }}>Kiếm Vực 3D Ngoại Truyện</h2>
          <p style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}><strong>Tác giả:</strong> Bảo</p>
          
          <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px', borderLeft: '4px solid #e74c3c', marginBottom: '30px' }}>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#444' }}>
              Hành trình khám phá một vùng đất mới sau khi server cũ đóng cửa. Nhân vật chính mang theo những ký ức và kỹ năng bá đạo để xưng bá. Một chặng đường đầy nhiệt huyết và kịch tính!
            </p>
          </div>

          <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', marginBottom: '20px' }}>📚 Mục Lục Chương</h3>
          
          {loading ? <p>Đang tải dữ liệu...</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
              {chapters.map(chap => (
                <Link key={chap.id} href={`/chapter/${chap.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ padding: '12px 15px', border: '1px solid #e0e0e0', borderRadius: '5px', color: '#2980b9', backgroundColor: '#fff', transition: 'all 0.2s', cursor: 'pointer' }}
                       onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f8ff'}
                       onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}>
                    {chap.title}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
