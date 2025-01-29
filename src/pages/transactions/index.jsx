import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Modal from "../../components/ui/Modal";
import Icon from "../../components/AppIcon";
import { useToast } from "../../components/ui/Toast";
import LoadingSpinner from "../../components/ui/LoadingSpinner";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "all",
    portfolio: "all",
    dateRange: "30d",
    search: "",
  });
  const { toast } = useToast();

  // Mock transaction data
  useEffect(() => {
    setTimeout(() => {
      setTransactions([
        {
          id: 1,
          date: "2025-01-20",
          type: "buy",
          symbol: "AAPL",
          name: "Apple Inc.",
          quantity: 100,
          price: 185.42,
          amount: 18542,
          portfolio: "Growth Portfolio A",
          status: "completed",
          fees: 9.99,
        },
        {
          id: 2,
          date: "2025-01-19",
          type: "sell",
          symbol: "MSFT",
          name: "Microsoft Corp.",
          quantity: 50,
          price: 412.58,
          amount: 20629,
          portfolio: "Growth Portfolio A",
          status: "completed",
          fees: 9.99,
        },
        {
          id: 3,
          date: "2025-01-18",
          type: "dividend",
          symbol: "JPM",
          name: "JPMorgan Chase & Co.",
          quantity: 0,
          price: 0,
          amount: 450.75,
          portfolio: "Balanced Strategy C",
          status: "completed",
          fees: 0,
        },
        {
          id: 4,
          date: "2025-01-17",
          type: "buy",
          symbol: "GOOGL",
          name: "Alphabet Inc.",
          quantity: 25,
          price: 142.87,
          amount: 3571.75,
          portfolio: "Tech Innovation D",
          status: "pending",
          fees: 9.99,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter transactions
  useEffect(() => {
    let filtered = transactions;

    if (filters.type !== "all") {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    if (filters.portfolio !== "all") {
      filtered = filtered.filter((t) => t.portfolio === filters.portfolio);
    }

    if (filters.search) {
      filtered = filtered.filter(
        (t) =>
          t.symbol.toLowerCase().includes(filters.search.toLowerCase()) ||
          t.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Date range filtering
    const now = new Date();
    const days = parseInt(filters.dateRange);
    if (!isNaN(days)) {
      const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      filtered = filtered.filter((t) => new Date(t.date) >= cutoffDate);
    }

    setFilteredTransactions(filtered);
  }, [transactions, filters]);

  const handleAddTransaction = (transactionData) => {
    const newTransaction = {
      ...transactionData,
      id: Date.now(),
      status: "pending",
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    toast.success("Transaction added successfully");
    setIsAddModalOpen(false);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleUpdateTransaction = (transactionData) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === transactionData.id ? transactionData : t))
    );
    toast.success("Transaction updated successfully");
    setIsEditModalOpen(false);
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (transactionId) => {
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
    toast.success("Transaction deleted successfully");
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case "buy":
        return "ArrowUpCircle";
      case "sell":
        return "ArrowDownCircle";
      case "dividend":
        return "DollarSign";
      default:
        return "Activity";
    }
  };

  const getTransactionColor = (type) => {
    switch (type) {
      case "buy":
        return "text-success";
      case "sell":
        return "text-error";
      case "dividend":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <main className="pt-16">
          <div className="container-dashboard py-8">
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size={40} text="Loading transactions..." />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Transactions - Invest Wise</title>
        <meta
          name="description"
          content="Manage and track all portfolio transactions including buy, sell, and dividend activities."
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
                  Transaction History
                </h1>
                <p className="text-muted-foreground">
                  Track and manage all portfolio transactions
                </p>
              </div>

              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button variant="outline" iconName="Download">
                  Export
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  onClick={() => setIsAddModalOpen(true)}
                >
                  Add Transaction
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-card border border-border rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Search
                  </label>
                  <Input
                    type="text"
                    placeholder="Symbol or company name..."
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                    iconName="Search"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Transaction Type
                  </label>
                  <Select
                    value={filters.type}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, type: value }))
                    }
                    options={[
                      { value: "all", label: "All Types" },
                      { value: "buy", label: "Buy Orders" },
                      { value: "sell", label: "Sell Orders" },
                      { value: "dividend", label: "Dividends" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Portfolio
                  </label>
                  <Select
                    value={filters.portfolio}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, portfolio: value }))
                    }
                    options={[
                      { value: "all", label: "All Portfolios" },
                      {
                        value: "Growth Portfolio A",
                        label: "Growth Portfolio A",
                      },
                      {
                        value: "Conservative Fund B",
                        label: "Conservative Fund B",
                      },
                      {
                        value: "Balanced Strategy C",
                        label: "Balanced Strategy C",
                      },
                      {
                        value: "Tech Innovation D",
                        label: "Tech Innovation D",
                      },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date Range
                  </label>
                  <Select
                    value={filters.dateRange}
                    onChange={(value) =>
                      setFilters((prev) => ({ ...prev, dateRange: value }))
                    }
                    options={[
                      { value: "7d", label: "Last 7 days" },
                      { value: "30d", label: "Last 30 days" },
                      { value: "90d", label: "Last 90 days" },
                      { value: "365d", label: "Last year" },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-card border border-border rounded-lg">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">
                  Recent Transactions ({filteredTransactions.length})
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/30">
                    <tr>
                      <th className="text-left p-4 text-sm font-medium text-foreground">
                        Type
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-foreground">
                        Security
                      </th>
                      <th className="text-right p-4 text-sm font-medium text-foreground">
                        Quantity
                      </th>
                      <th className="text-right p-4 text-sm font-medium text-foreground">
                        Price
                      </th>
                      <th className="text-right p-4 text-sm font-medium text-foreground">
                        Amount
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-foreground">
                        Portfolio
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-foreground">
                        Date
                      </th>
                      <th className="text-left p-4 text-sm font-medium text-foreground">
                        Status
                      </th>
                      <th className="text-center p-4 text-sm font-medium text-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-border hover:bg-muted/20 transition-colors"
                      >
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Icon
                              name={getTransactionIcon(transaction.type)}
                              size={16}
                              className={getTransactionColor(transaction.type)}
                            />
                            <span className="capitalize text-sm font-medium text-foreground">
                              {transaction.type}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <div className="font-medium text-foreground">
                              {transaction.symbol}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {transaction.name}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-sm text-foreground">
                            {transaction.quantity
                              ? transaction.quantity.toLocaleString()
                              : "-"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <span className="text-sm text-foreground">
                            {transaction.price
                              ? `₹${transaction.price.toFixed(2)}`
                              : "-"}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <span
                            className={`text-sm font-medium ${getTransactionColor(
                              transaction.type
                            )}`}
                          >
                            ₹{transaction.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-muted-foreground">
                            {transaction.portfolio}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-sm text-xs font-medium ${
                              transaction.status === "completed"
                                ? "bg-success/10 text-success"
                                : "bg-warning/10 text-warning"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8"
                              onClick={() => handleEditTransaction(transaction)}
                            >
                              <Icon name="Edit" size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-error hover:text-error"
                              onClick={() =>
                                handleDeleteTransaction(transaction.id)
                              }
                            >
                              <Icon name="Trash2" size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Transaction Modal */}
      <TransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTransaction}
        title="Add New Transaction"
      />

      {/* Edit Transaction Modal */}
      <TransactionModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleUpdateTransaction}
        transaction={editingTransaction}
        title="Edit Transaction"
      />
    </>
  );
};

// Transaction Modal Component
const TransactionModal = ({ isOpen, onClose, onSave, transaction, title }) => {
  const [formData, setFormData] = useState({
    type: "buy",
    symbol: "",
    name: "",
    quantity: "",
    price: "",
    portfolio: "Growth Portfolio A",
    date: new Date().toISOString().split("T")[0],
    fees: "9.99",
  });

  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        symbol: transaction.symbol,
        name: transaction.name,
        quantity: transaction.quantity.toString(),
        price: transaction.price.toString(),
        portfolio: transaction.portfolio,
        date: transaction.date,
        fees: transaction.fees.toString(),
      });
    } else {
      setFormData({
        type: "buy",
        symbol: "",
        name: "",
        quantity: "",
        price: "",
        portfolio: "Growth Portfolio A",
        date: new Date().toISOString().split("T")[0],
        fees: "9.99",
      });
    }
  }, [transaction, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      ...formData,
      id: transaction?.id,
      quantity: parseFloat(formData.quantity) || 0,
      price: parseFloat(formData.price) || 0,
      amount:
        (parseFloat(formData.quantity) || 0) *
        (parseFloat(formData.price) || 0),
      fees: parseFloat(formData.fees) || 0,
    };
    onSave(transactionData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      className="bg-white text-black"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Transaction Type
            </label>
            <Select
              value={formData.type}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, type: value }))
              }
              options={[
                { value: "buy", label: "Buy Order" },
                { value: "sell", label: "Sell Order" },
                { value: "dividend", label: "Dividend Payment" },
              ]}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Portfolio
            </label>
            <Select
              value={formData.portfolio}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, portfolio: value }))
              }
              options={[
                { value: "Growth Portfolio A", label: "Growth Portfolio A" },
                { value: "Conservative Fund B", label: "Conservative Fund B" },
                { value: "Balanced Strategy C", label: "Balanced Strategy C" },
                { value: "Tech Innovation D", label: "Tech Innovation D" },
              ]}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Symbol
            </label>
            <Input
              type="text"
              value={formData.symbol}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  symbol: e.target.value.toUpperCase(),
                }))
              }
              placeholder="e.g., AAPL"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Company Name
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="e.g., Apple Inc."
              required
            />
          </div>

          {formData.type !== "dividend" && (
            <>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantity
                </label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      quantity: e.target.value,
                    }))
                  }
                  placeholder="Number of shares"
                  min="0"
                  step="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price per Share
                </label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="Price per share"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Date
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, date: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Fees
            </label>
            <Input
              type="number"
              value={formData.fees}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fees: e.target.value }))
              }
              placeholder="Transaction fees"
              min="0"
              step="0.01"
            />
          </div>
        </div>

        {/* Transaction Summary */}
        {formData.quantity && formData.price && (
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">
              Transaction Summary
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="text-foreground">
                  ₹
                  {(
                    (parseFloat(formData.quantity) || 0) *
                    (parseFloat(formData.price) || 0)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fees:</span>
                <span className="text-foreground">
                  ₹{(parseFloat(formData.fees) || 0).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between font-medium border-t border-border pt-1 mt-2">
                <span className="text-foreground">Total:</span>
                <span className="text-foreground">
                  ₹
                  {(
                    (parseFloat(formData.quantity) || 0) *
                      (parseFloat(formData.price) || 0) +
                    (parseFloat(formData.fees) || 0)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-6 border-t border-border">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="default">
            {transaction ? "Update Transaction" : "Add Transaction"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default Transactions;
