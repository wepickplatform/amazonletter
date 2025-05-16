export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container-custom">
        <div className="text-center text-gray-600">
          <p>© {new Date().getFullYear()} 트렌디 뉴스레터. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
