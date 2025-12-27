export function Footer() {
  return (
    <footer className="py-8 px-4 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="text-center md:text-left">
            <p className="font-medium text-foreground mb-1">GDPR Manager</p>
            <p>
              Vytvořil{' '}
              <a 
                href="https://adam.porybny.cz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Adam Porybný
              </a>
            </p>
          </div>
          
          <div className="text-center">
            <p>
              Dokumenty jsou generovány na základě vašich odpovědí.
            </p>
            <p>
              Pro specifické právní rady doporučujeme konzultaci s právníkem.
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="mb-1">
              <a 
                href="mailto:adam@porybny.cz"
                className="hover:text-primary transition-colors"
              >
                adam@porybny.cz
              </a>
            </p>
            <p className="text-xs">
              © {new Date().getFullYear()} Všechna práva vyhrazena
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
