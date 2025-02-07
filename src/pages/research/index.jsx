import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/Card";
import Icon from "../../components/AppIcon";
import researchData from "./researchData.json";
import researchTabs from "./researchTabs.json";

const Research = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("all");
  const [selectedTab, setSelectedTab] = useState("overview");
  const [selectedStock, setSelectedStock] = useState(null);

  const handleStockSearch = (symbol) => {
    // Mock stock data
    const stockData = {
      symbol: symbol.toUpperCase(),
      name: "Company Name",
      price: 185.42,
      change: 2.34,
      changePercent: 1.28,
      marketCap: "2.85T",
      pe: 28.5,
      eps: 6.5,
      dividend: "0.92",
      volume: "55.2M",
    };
    setSelectedStock(stockData);
  };

  return (
    <>
      <Helmet>
        <title>Market Research - Invest Wise</title>
        <meta
          name="description"
          content="Comprehensive market research with real-time data, analyst recommendations, and stock analysis tools."
        />
      </Helmet>

      <div className="min-h-screen">
        <main className="pt-16">
          <div className="container-dashboard py-8">
            <Breadcrumb />

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-foreground mb-2">
                  Market Research
                </h1>
                <p className="text-muted-foreground">
                  Real-time market data, analysis, and investment research
                </p>
              </div>

              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button variant="outline" iconName="Bell">
                  Set Alerts
                </Button>
                <Button variant="outline" iconName="Download">
                  Export Report
                </Button>
                <Button variant="default" iconName="RefreshCw">
                  Refresh Data
                </Button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-8 border-b border-border">
              {researchTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
                    selectedTab === tab.id
                      ? "border-primary text-primary bg-primary/5"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <Icon name={tab.icon} size={16} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {/* Market Overview Tab */}
              {selectedTab === "overview" && (
                <div className="space-y-8">
                  {/* Market Indices */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon
                          name="TrendingUp"
                          size={20}
                          className="text-primary"
                        />
                        <span>Major Indices</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {researchData.marketOverview.indices.map((index) => (
                          <div
                            key={index.name}
                            className="bg-muted/30 rounded-lg p-4"
                          >
                            <h4 className="font-medium text-foreground mb-2">
                              {index.name}
                            </h4>
                            <div className="text-2xl font-bold text-foreground">
                              {index.value}
                            </div>
                            <div
                              className={`text-sm ${
                                index.change.startsWith("+")
                                  ? "text-success"
                                  : "text-error"
                              }`}
                            >
                              {index.change} ({index.changePercent})
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sector Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Icon
                          name="PieChart"
                          size={20}
                          className="text-primary"
                        />
                        <span>Sector Performance</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {researchData.marketOverview.sectors.map((sector) => (
                          <div
                            key={sector.name}
                            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                          >
                            <span className="font-medium text-foreground">
                              {sector.name}
                            </span>
                            <span className={`font-bold ${sector.color}`}>
                              {sector.performance}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Top Movers Tab */}
              {selectedTab === "movers" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Top Gainers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-success">
                        <Icon name="ArrowUp" size={20} />
                        <span>Top Gainers</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {researchData.topMovers.gainers.map((stock) => (
                          <div
                            key={stock.symbol}
                            className="flex items-center justify-between p-3 bg-success/5 rounded-lg"
                          >
                            <div>
                              <div className="font-bold text-foreground">
                                {stock.symbol}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {stock.name}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-foreground">
                                {stock.price}
                              </div>
                              <div className="text-sm font-medium text-success">
                                {stock.change}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Losers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-error">
                        <Icon name="ArrowDown" size={20} />
                        <span>Top Losers</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {researchData.topMovers.losers.map((stock) => (
                          <div
                            key={stock.symbol}
                            className="flex items-center justify-between p-3 bg-error/5 rounded-lg"
                          >
                            <div>
                              <div className="font-bold text-foreground">
                                {stock.symbol}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {stock.name}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-foreground">
                                {stock.price}
                              </div>
                              <div className="text-sm font-medium text-error">
                                {stock.change}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Stock Analysis Tab */}
              {selectedTab === "analysis" && (
                <div className="space-y-8">
                  {/* Search Bar */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <Input
                            type="text"
                            placeholder="Enter stock symbol (e.g., AAPL)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            iconName="Search"
                          />
                        </div>
                        <Button
                          onClick={() => handleStockSearch(searchTerm)}
                          disabled={!searchTerm}
                        >
                          Analyze
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stock Analysis Results */}
                  {selectedStock && (
                    <div className="grid grid-cols-1 gap-8">
                      {/* Stock Info */}
                      <Card>
                        <CardHeader>
                          <CardTitle>{selectedStock.symbol}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="text-3xl font-bold text-foreground">
                                ₹{selectedStock.price}
                              </div>
                              <div
                                className={`text-sm ${
                                  selectedStock.change >= 0
                                    ? "text-success"
                                    : "text-error"
                                }`}
                              >
                                {selectedStock.change >= 0 ? "+" : ""}
                                {selectedStock.change} (
                                {selectedStock.changePercent}%)
                              </div>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Market Cap:
                                </span>
                                <span className="text-foreground">
                                  {selectedStock.marketCap}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  P/E Ratio:
                                </span>
                                <span className="text-foreground">
                                  {selectedStock.pe}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  EPS:
                                </span>
                                <span className="text-foreground">
                                  ₹{selectedStock.eps}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Dividend:
                                </span>
                                <span className="text-foreground">
                                  ₹{selectedStock.dividend}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">
                                  Volume:
                                </span>
                                <span className="text-foreground">
                                  {selectedStock.volume}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              )}

              {/* Analyst Recommendations Tab */}
              {selectedTab === "recommendations" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Icon
                        name="FileText"
                        size={20}
                        className="text-primary"
                      />
                      <span>Latest Analyst Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {researchData.analystRecommendations.map((rec, index) => (
                        <div key={index} className="p-4 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <span className="font-bold text-foreground">
                                {rec.symbol}
                              </span>
                              <span className="text-sm text-muted-foreground ml-2">
                                {rec.name}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {rec.date}
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span
                                className={`px-2 py-1 rounded-sm text-xs font-medium ${
                                  rec.rating === "Strong Buy"
                                    ? "bg-success text-success-foreground"
                                    : rec.rating === "Buy"
                                    ? "bg-success/70 text-success-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {rec.rating}
                              </span>
                              <span className="text-sm text-muted-foreground ml-2">
                                by {rec.analyst}
                              </span>
                            </div>
                            <div className="text-sm">
                              <span className="text-muted-foreground">
                                Target:{" "}
                              </span>
                              <span className="font-bold text-foreground">
                                {rec.targetPrice}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Research;
