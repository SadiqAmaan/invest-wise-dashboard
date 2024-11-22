import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import PortfolioList from './components/PortfolioList';
import PortfolioHeader from './components/PortfolioHeader';
import HoldingsTable from './components/HoldingsTable';
import PortfolioSummary from './components/PortfolioSummary';
import CreatePortfolioModal from './components/CreatePortfolioModal';
import EditPositionModal from './components/EditPositionModal';
import portfoliosData from './components/portfolios.json';
import holdingsData from './components/holdings.json';

const PortfolioManagement = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditPositionModalOpen, setIsEditPositionModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [portfolios, setPortfolios] = useState(portfoliosData);

  const [holdings, setHoldings] = useState(holdingsData);

  const handlePortfolioSelect = (portfolio) => {
    setSelectedPortfolio(portfolio);
  };

  const handleCreatePortfolio = (portfolioData) => {
    setPortfolios(prev => [...prev, portfolioData]);
  };

  const handleEditPosition = (position) => {
    setEditingPosition(position);
    setIsEditPositionModalOpen(true);
  };

  const handleAddPosition = () => {
    setEditingPosition(null);
    setIsEditPositionModalOpen(true);
  };

  const handleSavePosition = (positionData) => {
    if (editingPosition) {
      // Update existing position
      setHoldings(prev => prev.map(h => h.id === positionData.id ? positionData : h));
    } else {
      // Add new position
      const newPosition = {
        ...positionData,
        id: Date.now(),
        unrealizedGainLoss: "₹0",
        unrealizedGainLossPercent: "0.0%",
        dayChange: "₹0",
        dayChangePercent: "0.0%"
      };
      setHoldings(prev => [...prev, newPosition]);
    }
  };

  const handleDeletePositions = (positionIds) => {
    setHoldings(prev => prev.filter(h => !positionIds.includes(h.id)));
  };

  const handleImportCSV = (file) => {
    // Mock CSV import functionality
    console.log('Importing CSV file:', file.name);
    // In a real application, you would parse the CSV and add positions
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'rebalance': console.log('Rebalancing portfolio...');
        break;
      case 'add-position':
        handleAddPosition();
        break;
      case 'generate-report': console.log('Generating report...');
        break;
      case 'export-data':
        console.log('Exporting data...');
        break;
      default:
        break;
    }
  };

  const handlePortfolioEdit = () => {
    console.log('Editing portfolio:', selectedPortfolio?.name);
  };

  const handlePortfolioRebalance = () => {
    console.log('Rebalancing portfolio:', selectedPortfolio?.name);
  };

  const handlePortfolioExport = () => {
    console.log('Exporting portfolio:', selectedPortfolio?.name);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="pt-16">
        <div className="container-dashboard py-6">
          <Breadcrumb />
          
          <div className="grid grid-cols-12 gap-6 min-h-[calc(100vh-200px)]">
            {/* Left Panel - Portfolio List */}
            <div className="col-span-12 lg:col-span-3">
              <PortfolioList
                portfolios={portfolios}
                selectedPortfolio={selectedPortfolio}
                onPortfolioSelect={handlePortfolioSelect}
                onCreatePortfolio={() => setIsCreateModalOpen(true)}
              />
            </div>

            {/* Main Content Area */}
            <div className="col-span-12 lg:col-span-6 space-y-6 min-h-[calc(100vh-200px)]">
              <PortfolioHeader
                portfolio={selectedPortfolio}
                onEdit={handlePortfolioEdit}
                onRebalance={handlePortfolioRebalance}
                onExport={handlePortfolioExport}
              />

              {selectedPortfolio && (
                <HoldingsTable
                  holdings={holdings}
                  onAddPosition={handleAddPosition}
                  onEditPosition={handleEditPosition}
                  onDeletePositions={handleDeletePositions}
                  onImportCSV={handleImportCSV}
                />
              )}
            </div>

            {/* Right Panel - Portfolio Summary */}
            <div className="col-span-12 lg:col-span-3">
              <PortfolioSummary
                portfolio={selectedPortfolio}
                onQuickAction={handleQuickAction}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreatePortfolioModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePortfolio={handleCreatePortfolio}
      />

      <EditPositionModal
        isOpen={isEditPositionModalOpen}
        onClose={() => setIsEditPositionModalOpen(false)}
        onSavePosition={handleSavePosition}
        position={editingPosition}
      />
    </div>
  );
};

export default PortfolioManagement;