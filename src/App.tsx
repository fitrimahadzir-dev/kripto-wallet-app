import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  User, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CreditCard, 
  RefreshCw, 
  Home, 
  BarChart2, 
  Wallet, 
  Settings,
  ArrowRightLeft,
  QrCode,
  Search,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  DollarSign,
  Image as ImageIcon,
  Zap,
  Camera,
  Scan,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip, XAxis } from 'recharts';
import QRCode from 'react-qr-code';

// Mock Data
const transactions = [
  { id: 1, type: 'receive', title: 'Received KRIS', amount: '+500.00 KRIS', date: 'Today, 10:24 AM', status: 'completed', value: '+$1,250.00' },
  { id: 2, type: 'send', title: 'Sent to 0x4A2...9B1', amount: '-120.50 KRIS', date: 'Yesterday, 03:45 PM', status: 'completed', value: '-$301.25' },
  { id: 3, type: 'swap', title: 'Swapped ETH to KRIS', amount: '+85.00 KRIS', date: 'Mar 18, 09:12 AM', status: 'completed', value: '+$212.50' },
  { id: 4, type: 'receive', title: 'Staking Reward', amount: '+12.40 KRIS', date: 'Mar 15, 12:00 AM', status: 'completed', value: '+$31.00' },
  { id: 5, type: 'send', title: 'Sent to Fitri', amount: '-50.00 KRIS', date: 'Mar 12, 08:30 PM', status: 'completed', value: '-$125.00' },
];

function LoadingScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-alabaster flex flex-col items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="relative mb-8"
      >
        <div className="w-32 h-32 rounded-full bg-white shadow-2xl shadow-jade/20 flex items-center justify-center overflow-hidden border-4 border-jade/10">
          <img 
            src="https://cdn.jumpshare.com/preview/v8xjehqyLBLmCjNpmWPEY3l5JAZir8nFMNvd7YDrCG74nsl9gZIQ2P6UK_LH9u48sq0uV8pNuvHVjoXeRDp3XPaq7KA8Cpkm6Y4u8JgHc30" 
            alt="KerisWallet Logo" 
            className="w-24 h-24 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 border-2 border-dashed border-jade/30 rounded-full"
        />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-ebony tracking-tighter mb-2">KerisWallet</h1>
        <div className="flex items-center justify-center gap-1">
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-jade rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            className="w-1.5 h-1.5 bg-jade rounded-full" 
          />
          <motion.div 
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            className="w-1.5 h-1.5 bg-jade rounded-full" 
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [lastTab, setLastTab] = useState('Home');
  const [qrMode, setQrMode] = useState<'scan' | 'show'>('scan');
  const [isLoading, setIsLoading] = useState(true);

  const handleSetActiveTab = (tab: string) => {
    if (activeTab !== 'QR') {
      setLastTab(activeTab);
    }
    setActiveTab(tab);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-alabaster text-ebony flex justify-center font-sans selection:bg-jade/30">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {/* Mobile Container */}
      <div className="w-full max-w-md bg-alabaster min-h-screen relative shadow-2xl shadow-ebony/10 overflow-hidden flex flex-col border-x border-ebony/10">
        
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-96 bg-jade/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Header */}
        <header className="flex items-center justify-between p-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-ebony/10 flex items-center justify-center overflow-hidden">
              <img src="https://i.imgur.com/39kHwZp.jpg" alt="Fitri" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
            </div>
            <div>
              <p className="text-xs text-ebony/60 font-medium">Welcome back,</p>
              <h1 className="text-sm font-semibold text-ebony">Fitri</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setQrMode('show');
                handleSetActiveTab('QR');
              }}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-ebony/10 flex items-center justify-center relative hover:bg-alabaster transition-colors"
            >
              <QrCode size={18} className="text-ebony/80" />
            </button>
            <button 
              onClick={() => handleSetActiveTab('Notifications')}
              className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-ebony/10 flex items-center justify-center relative hover:bg-alabaster transition-colors"
            >
              <Bell size={18} className="text-ebony/80" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-jade rounded-full border-2 border-alabaster"></span>
            </button>
          </div>
        </header>

        {/* Main Content Scrollable */}
        <main className="flex-1 overflow-y-auto pb-40 px-6 relative z-10 no-scrollbar">
          {activeTab === 'Home' && (
            <HomeTab 
              setActiveTab={handleSetActiveTab}
              setQrMode={setQrMode}
            />
          )}
          {activeTab === 'Receive' && (
            <ReceiveTab setActiveTab={handleSetActiveTab} setQrMode={setQrMode} />
          )}
          {activeTab === 'Send' && (
            <SendTab setActiveTab={handleSetActiveTab} setQrMode={setQrMode} />
          )}
          {activeTab === 'Markets' && (
            <MarketsTab />
          )}
          {activeTab === 'Wallet' && (
            <WalletTab setActiveTab={handleSetActiveTab} />
          )}
          {activeTab === 'Settings' && (
            <SettingsTab />
          )}
          {activeTab === 'Notifications' && (
            <NotificationsTab />
          )}
          {activeTab === 'Buy' && (
            <BuyTab setActiveTab={handleSetActiveTab} />
          )}
          {activeTab === 'Swap' && (
            <SwapTab setActiveTab={handleSetActiveTab} />
          )}
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-6 pb-6 pt-4 pointer-events-none">
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2rem] shadow-[0_8px_32px_rgba(16,22,45,0.15)] border border-white/60 px-4 py-2 flex items-center justify-between pointer-events-auto">
            <NavItem icon={<Home size={24} />} active={activeTab === 'Home'} onClick={() => handleSetActiveTab('Home')} />
            <NavItem icon={<BarChart2 size={24} />} active={activeTab === 'Markets'} onClick={() => handleSetActiveTab('Markets')} />
            
            {/* Spacer for central button */}
            <div className="w-16 h-2"></div>
 
            <NavItem icon={<Wallet size={24} />} active={activeTab === 'Wallet'} onClick={() => handleSetActiveTab('Wallet')} />
            <NavItem icon={<Settings size={24} />} active={activeTab === 'Settings'} onClick={() => handleSetActiveTab('Settings')} />
 
            {/* Central Floating Button */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-6">
              <div className="p-2 bg-alabaster/90 backdrop-blur-md rounded-full">
                <button 
                  onClick={() => {
                    setQrMode('scan');
                    handleSetActiveTab('QR');
                  }}
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-jade to-jade-dark text-white shadow-lg shadow-jade/40 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <QrCode size={26} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* QR Scanner Overlay */}
        <AnimatePresence>
          {activeTab === 'QR' && (
            <QRScannerTab onClose={() => setActiveTab(lastTab)} initialMode={qrMode} />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

function QRScannerTab({ onClose, initialMode = 'scan' }: { onClose: () => void, initialMode?: 'scan' | 'show' }) {
  const [mode, setMode] = useState<'scan' | 'show'>(initialMode);

  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-50 bg-zinc-900 flex flex-col"
    >
      {/* Top Actions */}
      <div className="flex justify-between items-center p-6 pt-12 text-white">
        <button className="p-3 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors"><ImageIcon size={20} /></button>
        <button className="p-3 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors"><Zap size={20} /></button>
        <button className="p-3 bg-white/10 rounded-full backdrop-blur-md hover:bg-white/20 transition-colors"><Camera size={20} /></button>
      </div>

      {/* Scanner Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative px-8">
        {mode === 'scan' ? (
          <>
            <div className="relative w-full aspect-square max-w-[280px]">
              {/* Corners */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-jade rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-jade rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-jade rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-jade rounded-br-xl"></div>
              
              {/* Animated Line */}
              <motion.div 
                animate={{ y: [0, 276, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="absolute top-0 left-0 right-0 h-1 bg-jade shadow-[0_0_14px_4px_rgba(1,190,125,0.5)] rounded-full"
              />
            </div>
            <p className="mt-12 text-white/70 text-sm font-medium">Align QR code within the frame to scan</p>
          </>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="bg-white p-6 rounded-3xl shadow-2xl shadow-jade/20">
              <QRCode value="https://piteghi.xyz" size={200} fgColor="#10162d" bgColor="#ffffff" />
            </div>
            <p className="mt-8 text-white/90 text-lg font-semibold tracking-wide">Fitri</p>
            <p className="mt-2 text-white/60 text-sm font-medium mb-6">Scan to pay me</p>
            
            <div className="bg-jade/10 border border-jade/30 text-jade px-4 py-3 rounded-xl flex items-center gap-3 max-w-[260px]">
              <AlertTriangle size={18} className="shrink-0" />
              <span className="text-xs font-medium leading-tight">Only send KRIS to this address. Other assets may be lost.</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="pb-8 pt-4 px-6">
        <div className="relative bg-zinc-800/90 backdrop-blur-xl rounded-[2rem] px-6 py-4 flex items-center justify-between border border-zinc-700 shadow-2xl">
          
          <button 
            onClick={() => setMode('show')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${mode === 'show' ? 'text-jade' : 'text-zinc-400 hover:text-white'}`}
          >
            <QrCode size={24} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Scan Me</span>
          </button>
          
          {/* Central Floating Button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8">
            <div className="p-2 bg-zinc-900 rounded-full">
              <button 
                onClick={() => setMode('scan')}
                className={`flex items-center justify-center w-16 h-16 rounded-full text-white shadow-lg transition-all duration-300 ${mode === 'scan' ? 'bg-jade shadow-jade/40 scale-105' : 'bg-zinc-700 hover:bg-jade hover:shadow-jade/40'}`}
              >
                <Scan size={28} />
              </button>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="flex flex-col items-center justify-center gap-1 text-zinc-400 hover:text-white transition-colors"
          >
            <Home size={24} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Return</span>
          </button>
          
        </div>
      </div>
    </motion.div>
  );
}

function ActionButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button 
        onClick={onClick}
        className="w-14 h-14 rounded-full bg-white/80 border border-ebony/10 flex items-center justify-center text-ebony/80 hover:bg-alabaster hover:border-jade/30 hover:text-jade transition-all active:scale-95 shadow-sm shadow-ebony/5"
      >
        {icon}
      </button>
      <span className="text-xs font-medium text-ebony/60">{label}</span>
    </div>
  );
}

function NavItem({ icon, active = false, onClick }: { icon: React.ReactNode, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
        active 
          ? 'text-jade' 
          : 'text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50'
      }`}
    >
      <div className={`transition-transform duration-300 ${active ? '-translate-y-1' : ''}`}>
        {icon}
      </div>
      <div className={`absolute bottom-2 w-1.5 h-1.5 rounded-full bg-jade transition-all duration-300 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
    </button>
  );
}

function HomeTab({ 
  setActiveTab, 
  setQrMode 
}: { 
  setActiveTab: (val: string) => void,
  setQrMode: (val: 'scan' | 'show') => void
}) {
  return (
    <>
      {/* Balance Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full rounded-[2rem] p-6 overflow-hidden mb-8 shadow-2xl shadow-ebony/20 bg-ebony"
      >
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-white/60 text-sm font-medium mb-1">Total Balance</p>
              <h2 className="text-4xl font-bold text-white tracking-tight">$12,450.75</h2>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 shadow-sm">
              <span className="text-jade text-xs font-bold">+5.2%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-jade flex items-center justify-center shadow-sm">
                <span className="text-white text-xs font-bold">K</span>
              </div>
              <p className="text-white font-medium tracking-wide">4,980.30 KRIS</p>
            </div>
            <p className="text-jade text-xs font-medium tracking-widest uppercase">KerisWallet</p>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="grid grid-cols-4 gap-4 mb-10"
      >
        <ActionButton icon={<ArrowUpRight size={22} />} label="Send" onClick={() => setActiveTab('Send')} />
        <ActionButton 
          icon={<ArrowDownLeft size={22} />} 
          label="Receive" 
          onClick={() => setActiveTab('Receive')} 
        />
        <ActionButton icon={<CreditCard size={22} />} label="Buy" onClick={() => setActiveTab('Buy')} />
        <ActionButton icon={<RefreshCw size={22} />} label="Swap" onClick={() => setActiveTab('Swap')} />
      </motion.div>

      {/* Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-ebony">Recent Transactions</h3>
          <button className="text-sm text-jade font-medium hover:text-jade-dark transition-colors">See All</button>
        </div>
        
        <div className="space-y-3">
          {transactions.map((tx, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (i * 0.05) }}
              key={tx.id} 
              className="flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-ebony/10 hover:bg-white transition-colors cursor-pointer group shadow-sm shadow-ebony/5"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-105 ${
                  tx.type === 'receive' ? 'bg-emerald-50 text-emerald-600' : 
                  tx.type === 'send' ? 'bg-jade/10 text-jade' : 
                  'bg-blue-50 text-blue-600'
                }`}>
                  {tx.type === 'receive' ? <ArrowDownLeft size={20} /> : 
                   tx.type === 'send' ? <ArrowUpRight size={20} /> : 
                   <ArrowRightLeft size={20} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ebony mb-0.5">{tx.title}</p>
                  <p className="text-xs text-ebony/60">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold mb-0.5 ${
                  tx.type === 'receive' ? 'text-emerald-600' : 
                  tx.type === 'send' ? 'text-ebony' : 
                  'text-emerald-600'
                }`}>{tx.amount}</p>
                <p className="text-xs text-ebony/60">{tx.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

function SendTab({ setActiveTab, setQrMode }: { setActiveTab: (val: string) => void, setQrMode: (val: 'scan' | 'show') => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-2"
    >
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('Home')}
          className="w-10 h-10 rounded-full bg-white/80 border border-ebony/10 flex items-center justify-center text-ebony/80 hover:bg-alabaster transition-colors shadow-sm shadow-ebony/5"
        >
          <ArrowRight className="rotate-180" size={18} />
        </button>
        <h2 className="text-2xl font-bold text-ebony">Send KRIS</h2>
      </div>

      <div className="bg-white/60 border border-ebony/10 rounded-[2rem] p-6 shadow-sm shadow-ebony/5">
        <div className="space-y-6">
          <div>
            <label className="text-xs text-ebony/60 font-bold uppercase tracking-wider mb-3 block">Recipient Address</label>
            <div className="bg-alabaster rounded-2xl p-4 border border-ebony/5 flex items-center gap-3 focus-within:ring-2 focus-within:ring-jade/20 transition-all">
              <input 
                type="text" 
                placeholder="0x..." 
                className="bg-transparent border-none outline-none text-ebony flex-1 text-sm font-medium placeholder:text-ebony/30"
              />
              <button 
                onClick={() => {
                  setQrMode('show');
                  setActiveTab('QR');
                }}
                className="w-10 h-10 rounded-xl bg-jade/10 text-jade flex items-center justify-center hover:bg-jade/20 transition-colors"
              >
                <QrCode size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs text-ebony/60 font-bold uppercase tracking-wider mb-3 block">Amount to Send</label>
            <div className="bg-alabaster rounded-2xl p-5 border border-ebony/5 relative focus-within:ring-2 focus-within:ring-jade/20 transition-all">
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="number"
                  placeholder="0.00"
                  className="bg-transparent border-none outline-none text-ebony flex-1 text-3xl font-bold placeholder:text-ebony/20 min-w-0"
                />
                <div className="bg-jade/10 px-3 py-1.5 rounded-xl border border-jade/20">
                  <span className="text-jade-dark font-bold text-sm tracking-tight">KRIS</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-ebony/40 font-medium">Available: 4,980.30 KRIS</p>
                <button className="text-xs font-bold text-jade hover:text-jade-dark uppercase tracking-wider">Use Max</button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <div className="bg-ebony/5 rounded-2xl p-4 space-y-3 mb-8">
              <div className="flex justify-between text-xs">
                <span className="text-ebony/60 font-medium">Network Fee</span>
                <span className="text-ebony font-bold">0.002 KRIS</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-ebony/60 font-medium">Estimated Time</span>
                <span className="text-ebony font-bold">~30 Seconds</span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-jade to-jade-dark text-white font-bold text-lg py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-jade/30">
              Review Transaction
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-jade/5 border border-jade/10 rounded-2xl flex gap-3">
        <Zap size={20} className="text-jade shrink-0" />
        <p className="text-xs text-ebony/60 leading-relaxed">
          Transactions on KerisWallet are near-instant and secured by the Keris Chain. Please double-check the recipient address.
        </p>
      </div>
    </motion.div>
  );
}

function ReceiveTab({ setActiveTab, setQrMode }: { setActiveTab: (val: string) => void, setQrMode: (val: 'scan' | 'show') => void }) {
  const walletAddress = "0x4A2...9B1";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-2"
    >
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('Home')}
          className="w-10 h-10 rounded-full bg-white/80 border border-ebony/10 flex items-center justify-center text-ebony/80 hover:bg-alabaster transition-colors shadow-sm shadow-ebony/5"
        >
          <ArrowRight className="rotate-180" size={18} />
        </button>
        <h2 className="text-2xl font-bold text-ebony">Receive KRIS</h2>
      </div>

      <div className="bg-white/60 border border-ebony/10 rounded-[2rem] p-8 shadow-sm shadow-ebony/5 flex flex-col items-center text-center">
        <div className="bg-white p-6 rounded-3xl shadow-xl shadow-ebony/5 border border-ebony/5 mb-8">
          <QRCode value="https://piteghi.xyz" size={200} fgColor="#10162d" bgColor="#ffffff" />
        </div>

        <div className="w-full space-y-4">
          <div>
            <p className="text-xs text-ebony/60 font-bold uppercase tracking-wider mb-2">Your Wallet Address</p>
            <div className="bg-alabaster rounded-2xl p-4 border border-ebony/5 flex items-center justify-between group">
              <span className="text-sm font-mono text-ebony font-medium truncate mr-2">{walletAddress}</span>
              <button className="text-jade font-bold text-xs uppercase hover:text-jade-dark transition-colors">Copy</button>
            </div>
          </div>

          <div className="bg-jade/10 border border-jade/30 text-jade px-4 py-4 rounded-2xl flex items-start gap-3">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
            <p className="text-xs font-medium leading-relaxed text-left">
              Only send KRIS to this address. Sending other assets may result in permanent loss.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MarketsTab() {
  const chartData = [
    { time: '10:00', price: 2.45 },
    { time: '11:00', price: 2.48 },
    { time: '12:00', price: 2.42 },
    { time: '13:00', price: 2.51 },
    { time: '14:00', price: 2.49 },
    { time: '15:00', price: 2.55 },
    { time: '16:00', price: 2.50 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-2"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-ebony">Markets</h2>
        <button className="w-10 h-10 rounded-full bg-white/80 hover:bg-alabaster border border-ebony/10 flex items-center justify-center text-ebony/80 transition-colors shadow-sm shadow-ebony/5">
          <Search size={18} />
        </button>
      </div>
 
      {/* KRIS/USDT Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex -space-x-2">
          <div className="w-10 h-10 rounded-full bg-jade text-white flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm z-10">
            K
          </div>
          <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm">
            ₮
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-ebony">KRIS / USDT</h3>
          <p className="text-sm text-ebony/60">KerisWallet</p>
        </div>
      </div>
 
      {/* Price Info */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-ebony tracking-tight mb-2">2.50 <span className="text-xl text-ebony/60 font-medium">USDT</span></h1>
        <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-100">
          <ArrowUpRight size={14} />
          <span>+0.05 (2.04%)</span>
        </div>
      </div>
 
      {/* Chart */}
      <div className="h-64 w-full mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#10162d', opacity: 0.5, fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              domain={['dataMin - 0.05', 'dataMax + 0.05']} 
              hide 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
              itemStyle={{ color: '#01be7d', fontWeight: 'bold' }}
              formatter={(value: number) => [`${value} USDT`, 'Price']}
              labelStyle={{ color: '#10162d', opacity: 0.7, marginBottom: '4px' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#01be7d" 
              strokeWidth={3} 
              dot={false} 
              activeDot={{ r: 6, fill: '#01be7d', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
 
      {/* Timeframe Selectors */}
      <div className="flex items-center justify-between bg-white/60 border border-ebony/10 rounded-2xl p-1 mb-8 shadow-sm shadow-ebony/5">
        {['1H', '1D', '1W', '1M', '1Y', 'ALL'].map((time, i) => (
          <button 
            key={time}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-colors ${
              i === 1 ? 'bg-jade text-white shadow-sm' : 'text-ebony/60 hover:text-ebony hover:bg-alabaster'
            }`}
          >
            {time}
          </button>
        ))}
      </div>
 
      {/* Market Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/60 border border-ebony/10 rounded-2xl p-4 shadow-sm shadow-ebony/5">
          <p className="text-xs text-ebony/60 font-medium mb-1">24h High</p>
          <p className="text-sm font-bold text-ebony">2.55 USDT</p>
        </div>
        <div className="bg-white/60 border border-ebony/10 rounded-2xl p-4 shadow-sm shadow-ebony/5">
          <p className="text-xs text-ebony/60 font-medium mb-1">24h Low</p>
          <p className="text-sm font-bold text-ebony">2.42 USDT</p>
        </div>
        <div className="bg-white/60 border border-ebony/10 rounded-2xl p-4 shadow-sm shadow-ebony/5">
          <p className="text-xs text-ebony/60 font-medium mb-1">Volume (24h)</p>
          <p className="text-sm font-bold text-ebony">1.2M KRIS</p>
        </div>
        <div className="bg-white/60 border border-ebony/10 rounded-2xl p-4 shadow-sm shadow-ebony/5">
          <p className="text-xs text-ebony/60 font-medium mb-1">Market Cap</p>
          <p className="text-sm font-bold text-ebony">$25.5M</p>
        </div>
      </div>
    </motion.div>
  );
}

function WalletTab({ setActiveTab }: { setActiveTab: (val: string) => void }) {
  const assets = [
    { id: 'kris', name: 'KerisWallet', symbol: 'KRIS', balance: '4,980.30', value: '$12,450.75', isMain: true, color: 'bg-jade', icon: 'K' },
    { id: 'usd', name: 'US Dollar', symbol: 'USD', balance: '1,250.00', value: '$1,250.00', isMain: false, color: 'bg-emerald-500', icon: <DollarSign size={16} strokeWidth={3} /> },
    { id: 'myr', name: 'Malaysian Ringgit', symbol: 'MYR', balance: '4,500.00', value: '$957.45', isMain: false, color: 'bg-blue-500', icon: 'RM' },
    { id: 'usdt', name: 'Tether', symbol: 'USDT', balance: '850.00', value: '$850.00', isMain: false, color: 'bg-teal-500', icon: '₮' },
    { id: 'usdc', name: 'USD Coin', symbol: 'USDC', balance: '320.50', value: '$320.50', isMain: false, color: 'bg-blue-600', icon: '$' },
    { id: 'dai', name: 'Dai', symbol: 'DAI', balance: '150.00', value: '$150.00', isMain: false, color: 'bg-yellow-500', icon: '◈' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-2"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-ebony">My Wallet</h2>
        <button className="w-10 h-10 rounded-full bg-white/80 hover:bg-alabaster border border-ebony/10 flex items-center justify-center text-ebony/80 transition-colors shadow-sm shadow-ebony/5">
          <Search size={18} />
        </button>
      </div>
 
      {/* Total Portfolio Value */}
      <div className="mb-8 text-center">
        <p className="text-sm font-medium text-ebony/60 mb-1">Total Portfolio Value</p>
        <h1 className="text-4xl font-bold text-ebony tracking-tight">$15,978.70</h1>
        <div className="inline-flex items-center gap-1 mt-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-100">
          <ArrowUpRight size={14} />
          <span>+$342.50 (2.1%)</span>
        </div>
      </div>
 
      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('Receive')}
          className="flex flex-col items-center justify-center gap-2 bg-white/80 border border-ebony/10 rounded-2xl p-4 hover:bg-alabaster transition-colors shadow-sm shadow-ebony/5"
        >
          <div className="w-10 h-10 rounded-full bg-jade/10 text-jade flex items-center justify-center">
            <ArrowDownLeft size={20} />
          </div>
          <span className="text-xs font-semibold text-ebony">Deposit</span>
        </button>
        <button 
          onClick={() => setActiveTab('Send')}
          className="flex flex-col items-center justify-center gap-2 bg-white/80 border border-ebony/10 rounded-2xl p-4 hover:bg-alabaster transition-colors shadow-sm shadow-ebony/5"
        >
          <div className="w-10 h-10 rounded-full bg-jade/10 text-jade flex items-center justify-center">
            <ArrowUpRight size={20} />
          </div>
          <span className="text-xs font-semibold text-ebony">Withdraw</span>
        </button>
        <button className="flex flex-col items-center justify-center gap-2 bg-white/80 border border-ebony/10 rounded-2xl p-4 hover:bg-alabaster transition-colors shadow-sm shadow-ebony/5">
          <div className="w-10 h-10 rounded-full bg-jade/10 text-jade flex items-center justify-center">
            <RefreshCw size={20} />
          </div>
          <span className="text-xs font-semibold text-ebony">Exchange</span>
        </button>
      </div>
 
      {/* Assets List */}
      <h3 className="text-lg font-semibold text-ebony mb-4">Assets</h3>
      <div className="space-y-3">
        {assets.map((asset, i) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + (i * 0.05) }}
            key={asset.id}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-colors cursor-pointer group shadow-sm shadow-ebony/5 ${
              asset.isMain 
                ? 'bg-gradient-to-br from-jade to-ebony border-jade-dark text-white' 
                : 'bg-white/60 border-ebony/10 hover:bg-white text-ebony'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-inner ${asset.color} ${asset.isMain ? 'ring-2 ring-white/30' : ''}`}>
                {typeof asset.icon === 'string' ? asset.icon : asset.icon}
              </div>
              <div>
                <p className={`text-sm font-semibold mb-0.5 ${asset.isMain ? 'text-white' : 'text-ebony'}`}>
                  {asset.name}
                </p>
                <p className={`text-xs ${asset.isMain ? 'text-alabaster' : 'text-ebony/60'}`}>
                  {asset.balance} {asset.symbol}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold mb-0.5 ${asset.isMain ? 'text-white' : 'text-ebony'}`}>
                {asset.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function SettingsTab() {
  const settingsOptions = [
    { id: 'account', icon: <User size={20} />, label: 'Account Details', desc: 'Profile, Email, Password' },
    { id: 'security', icon: <Search size={20} />, label: 'Security', desc: '2FA, Face ID, PIN' },
    { id: 'notifications', icon: <Bell size={20} />, label: 'Notifications', desc: 'Push, Email, SMS' },
    { id: 'payment', icon: <CreditCard size={20} />, label: 'Payment Methods', desc: 'Cards, Bank Accounts' },
  ];
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-2"
    >
      <h2 className="text-2xl font-bold text-ebony mb-6">Settings</h2>
      
      <div className="bg-white/60 border border-ebony/10 rounded-[2rem] p-6 mb-6 flex items-center gap-4 shadow-sm shadow-ebony/5">
        <div className="w-16 h-16 rounded-full bg-white border border-ebony/10 flex items-center justify-center overflow-hidden">
          <img src="https://i.imgur.com/39kHwZp.jpg" alt="Fitri" className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-ebony">Fitri</h3>
          <p className="text-sm text-ebony/60">fitri@email.com</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-white/80 hover:bg-alabaster border border-ebony/5 transition-colors flex items-center justify-center text-ebony/80">
          <ChevronRight size={20} />
        </button>
      </div>
 
      <div className="space-y-3">
        {settingsOptions.map((option, i) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + (i * 0.05) }}
            key={option.id}
            className="flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-ebony/10 hover:bg-white transition-colors cursor-pointer group shadow-sm shadow-ebony/5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-jade/10 text-jade flex items-center justify-center group-hover:scale-105 transition-transform group-hover:bg-jade/20 group-hover:text-jade-dark">
                {option.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-ebony mb-0.5">{option.label}</p>
                <p className="text-xs text-ebony/60">{option.desc}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-ebony/20 group-hover:text-jade transition-colors" />
          </motion.div>
        ))}
      </div>
 
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <button className="w-full py-4 rounded-2xl border border-ebony/10 text-jade font-semibold hover:bg-alabaster transition-colors bg-white/60 shadow-sm shadow-ebony/5">
          Log Out
        </button>
      </motion.div>
    </motion.div>
  );
}

function NotificationsTab() {
  const notifications = [
    { id: 1, title: 'Payment Received', desc: 'You received 500 KRIS from Sarah.', time: '2m ago', icon: <ArrowDownLeft size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 2, title: 'Security Alert', desc: 'New login from Mac OS device.', time: '1h ago', icon: <AlertTriangle size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 3, title: 'System Update', desc: 'KerisWallet v2.4 is now live. Check out the new features.', time: '1d ago', icon: <Zap size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 4, title: 'Payment Sent', desc: 'You sent 120 KRIS to Coffee Shop.', time: '2d ago', icon: <ArrowUpRight size={20} />, color: 'text-jade', bg: 'bg-jade/10' },
  ];
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-2"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-ebony">Notifications</h2>
        <button className="text-sm text-jade font-medium hover:text-jade-dark transition-colors">Mark all read</button>
      </div>
 
      <div className="space-y-3">
        {notifications.map((notif, i) => (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + (i * 0.05) }}
            key={notif.id}
            className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 border border-ebony/10 hover:bg-white transition-colors cursor-pointer shadow-sm shadow-ebony/5"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
              {notif.icon}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-sm font-semibold text-ebony">{notif.title}</p>
                <span className="text-[10px] font-medium text-ebony/40 whitespace-nowrap">{notif.time}</span>
              </div>
              <p className="text-xs text-ebony/60 leading-relaxed">{notif.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function BuyTab({ setActiveTab }: { setActiveTab: (val: string) => void }) {
  const [amount, setAmount] = useState('');
  const price = 2.50;
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-2"
    >
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('Home')}
          className="w-10 h-10 rounded-full bg-white/80 border border-ebony/10 flex items-center justify-center text-ebony/80 hover:bg-alabaster transition-colors shadow-sm shadow-ebony/5"
        >
          <ArrowRight className="rotate-180" size={18} />
        </button>
        <h2 className="text-2xl font-bold text-ebony">Buy KRIS</h2>
      </div>
      
      <div className="bg-ebony rounded-[2rem] p-6 text-white mb-8 shadow-xl shadow-ebony/20">
        <p className="text-white/60 text-sm font-medium mb-1">Current Balance</p>
        <h3 className="text-3xl font-bold mb-4">4,980.30 KRIS</h3>
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">KRIS Price</p>
          <p className="text-lg font-bold text-jade">$2.50 <span className="text-xs font-normal text-white/40">USDT</span></p>
        </div>
      </div>
 
      <div className="bg-white/60 border border-ebony/10 rounded-[2rem] p-6 shadow-sm shadow-ebony/5">
        <label className="text-xs text-ebony/60 font-bold uppercase tracking-wider mb-3 block">Amount to Buy</label>
        <div className="flex items-center gap-2 bg-alabaster rounded-2xl p-4 border border-ebony/5 mb-6 focus-within:ring-2 focus-within:ring-jade/20 focus-within:border-jade/30 transition-all">
          <input 
            type="number" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00" 
            className="bg-transparent border-none outline-none text-ebony flex-1 text-2xl font-bold placeholder:text-ebony/20 min-w-0"
          />
          <div className="bg-jade/10 px-3 py-1.5 rounded-xl border border-jade/20 shrink-0">
            <span className="text-jade-dark font-bold text-sm tracking-tight">KRIS</span>
          </div>
        </div>
 
        <div className="flex items-center justify-between mb-8 px-2">
          <p className="text-sm text-ebony/60 font-medium">Estimated Cost</p>
          <p className="text-lg font-bold text-ebony">
            ${amount ? (parseFloat(amount) * price).toFixed(2) : '0.00'}
          </p>
        </div>
 
        <button className="w-full bg-gradient-to-r from-jade to-jade-dark text-white font-bold text-lg py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-jade/30">
          Buy Now
        </button>
      </div>

      <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
        <AlertTriangle size={20} className="text-amber-600 shrink-0" />
        <p className="text-xs text-amber-700 leading-relaxed">
          Please ensure you have enough USDT in your wallet to complete this transaction. Network fees may apply.
        </p>
      </div>
    </motion.div>
  );
}

function SwapTab({ setActiveTab }: { setActiveTab: (val: string) => void }) {
  const [fromAmount, setFromAmount] = useState('');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('KRIS');
  const [isFromSelectorOpen, setIsFromSelectorOpen] = useState(false);
  const [isToSelectorOpen, setIsToSelectorOpen] = useState(false);

  const tokens = [
    { symbol: 'KRIS', name: 'KerisWallet', price: 2.50 },
    { symbol: 'ETH', name: 'Ethereum', price: 2500.00 },
    { symbol: 'USDT', name: 'Tether', price: 1.00 },
    { symbol: 'BTC', name: 'Bitcoin', price: 65000.00 },
  ];

  const getPrice = (symbol: string) => tokens.find(t => t.symbol === symbol)?.price || 1;
  
  const estimatedReceive = fromAmount 
    ? (parseFloat(fromAmount) * getPrice(fromToken) / getPrice(toToken)).toFixed(4)
    : '0.00';

  const TokenSelector = ({ current, onSelect, onClose }: { current: string, onSelect: (sym: string) => void, onClose: () => void }) => (
    <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md rounded-[2rem] p-4 flex flex-col border border-ebony/10 shadow-xl">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-sm font-bold text-ebony uppercase tracking-wider">Select Token</h3>
        <button onClick={onClose} className="text-jade font-bold text-xs uppercase">Close</button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar">
        {tokens.map(token => (
          <button 
            key={token.symbol}
            onClick={() => {
              onSelect(token.symbol);
              onClose();
            }}
            className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
              current === token.symbol ? 'bg-jade border-jade-dark text-white' : 'bg-white border-ebony/5 text-ebony hover:bg-alabaster'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${current === token.symbol ? 'bg-white/20' : 'bg-jade/10 text-jade'}`}>
                {token.symbol[0]}
              </div>
              <div className="text-left">
                <p className="text-xs font-bold">{token.symbol}</p>
                <p className={`text-[10px] ${current === token.symbol ? 'text-alabaster' : 'text-ebony/60'}`}>{token.name}</p>
              </div>
            </div>
            <p className="text-xs font-bold">${token.price}</p>
          </button>
        ))}
      </div>
    </div>
  );
 
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-2"
    >
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={() => setActiveTab('Home')}
          className="w-10 h-10 rounded-full bg-white/80 border border-ebony/10 flex items-center justify-center text-ebony/80 hover:bg-alabaster transition-colors shadow-sm shadow-ebony/5"
        >
          <ArrowRight className="rotate-180" size={18} />
        </button>
        <h2 className="text-2xl font-bold text-ebony">Swap Tokens</h2>
      </div>
 
      <div className="space-y-2 relative">
        {/* From Section */}
        <div className="bg-white/60 border border-ebony/10 rounded-[2rem] p-6 shadow-sm relative overflow-hidden">
          <div className="flex justify-between mb-3">
            <label className="text-xs text-ebony/60 font-bold uppercase tracking-wider">From</label>
            <span className="text-xs text-ebony/40">Balance: 1.25 {fromToken}</span>
          </div>
          <div className="flex items-center gap-3">
            <input 
              type="number" 
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.00" 
              className="bg-transparent border-none outline-none text-ebony flex-1 text-2xl font-bold placeholder:text-ebony/20 min-w-0"
            />
            <button 
              onClick={() => setIsFromSelectorOpen(true)}
              className="flex items-center gap-2 bg-alabaster px-3 py-2 rounded-xl border border-ebony/5 text-ebony font-bold text-sm hover:bg-jade/10 transition-colors shrink-0"
            >
              {fromToken} <ChevronDown size={16} />
            </button>
          </div>
          {isFromSelectorOpen && (
            <TokenSelector 
              current={fromToken} 
              onSelect={setFromToken} 
              onClose={() => setIsFromSelectorOpen(false)} 
            />
          )}
        </div>
 
        {/* Swap Icon Button */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
          <button 
            onClick={() => {
              const temp = fromToken;
              setFromToken(toToken);
              setToToken(temp);
            }}
            className="w-10 h-10 rounded-full bg-jade text-white flex items-center justify-center shadow-lg border-4 border-alabaster hover:rotate-180 transition-transform duration-500"
          >
            <RefreshCw size={18} />
          </button>
        </div>
 
        {/* To Section */}
        <div className="bg-white/60 border border-ebony/10 rounded-[2rem] p-6 shadow-sm relative overflow-hidden">
          <div className="flex justify-between mb-3">
            <label className="text-xs text-ebony/60 font-bold uppercase tracking-wider">To (Estimated)</label>
            <span className="text-xs text-ebony/40">Balance: 4,980.30 {toToken}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 text-2xl font-bold text-ebony/20 truncate">
              {estimatedReceive}
            </div>
            <button 
              onClick={() => setIsToSelectorOpen(true)}
              className="flex items-center gap-2 bg-alabaster px-3 py-2 rounded-xl border border-ebony/5 text-ebony font-bold text-sm hover:bg-jade/10 transition-colors shrink-0"
            >
              {toToken} <ChevronDown size={16} />
            </button>
          </div>
          {isToSelectorOpen && (
            <TokenSelector 
              current={toToken} 
              onSelect={setToToken} 
              onClose={() => setIsToSelectorOpen(false)} 
            />
          )}
        </div>
      </div>
 
      <div className="mt-8 space-y-3 px-2">
        <div className="flex justify-between text-sm">
          <span className="text-ebony/60">Exchange Rate</span>
          <span className="text-ebony font-medium">1 {fromToken} = {(getPrice(fromToken) / getPrice(toToken)).toFixed(4)} {toToken}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ebony/60">Slippage Tolerance</span>
          <span className="text-ebony font-medium">0.5%</span>
        </div>
      </div>
 
      <button className="w-full mt-8 bg-gradient-to-r from-jade to-jade-dark text-white font-bold text-lg py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-jade/30">
        Swap Tokens
      </button>
    </motion.div>
  );
}

