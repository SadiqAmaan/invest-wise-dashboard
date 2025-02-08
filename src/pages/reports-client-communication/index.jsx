import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import ReportTemplateCard from "./components/ReportTemplateCard";
import ScheduledReportItem from "./components/ScheduledReportItem";
import ReportBuilder from "./components/ReportBuilder";
import EmailComposer from "./components/EmailComposer";
import ReportLibrary from "./components/ReportLibrary";
import ActivityFeed from "./components/ActivityFeed";
import DistributionList from "./components/DistributionList";
import reportTemplates from "./components/reportTemplates.json";
import scheduledReports from "./scheduledReports.json";
import generatedReports from "./generatedReports.json";
import recentActivities from "./recentActivities.json";
import categoryOptions from "./categoryOptions.json";
import reportTabs from "./reportTabs.json";
import distributionLists from "./distributionLists.json";

const ReportsClientCommunication = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isReportBuilderOpen, setIsReportBuilderOpen] = useState(false);
  const [isEmailComposerOpen, setIsEmailComposerOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const filteredTemplates = reportTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setIsReportBuilderOpen(true);
  };

  const handleTemplatePreview = (template) => {
    console.log("Preview template:", template);
  };

  const handleTemplateCustomize = (template) => {
    setSelectedTemplate(template);
    setIsReportBuilderOpen(true);
  };

  const handleReportSave = (reportConfig) => {
    console.log("Save report:", reportConfig);
  };

  const handleEmailSend = (emailData) => {
    console.log("Send email:", emailData);
  };

  const handleScheduledReportEdit = (report) => {
    console.log("Edit scheduled report:", report);
  };

  const handleScheduledReportPause = (report) => {
    console.log("Pause/Resume scheduled report:", report);
  };

  const handleScheduledReportDelete = (report) => {
    console.log("Delete scheduled report:", report);
  };

  const handleScheduledReportHistory = (report) => {
    console.log("View history for scheduled report:", report);
  };

  const handleReportDownload = (report) => {
    console.log("Download report:", report);
  };

  const handleReportDelete = (report) => {
    console.log("Delete report:", report);
  };

  const handleReportDuplicate = (report) => {
    console.log("Duplicate report:", report);
  };

  const handleReportShare = (report) => {
    console.log("Share report:", report);
  };

  const handleCreateDistributionList = (listData) => {
    console.log("Create distribution list:", listData);
  };

  const handleEditDistributionList = (list) => {
    console.log("Edit distribution list:", list);
  };

  const handleDeleteDistributionList = (listId) => {
    console.log("Delete distribution list:", listId);
  };

  return (
    <>
      <Helmet>
        <title>Reports & Client Communication - Invest Wise</title>
        <meta
          name="description"
          content="Generate professional reports and manage client communications with automated scheduling and distribution."
        />
      </Helmet>

      <div className="min-h-screen">
        <main className="pt-16">
          <div className="container-dashboard py-8">
            <Breadcrumb />

            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold text-foreground">
                  Reports & Client Communication
                </h1>
                <p className="text-muted-foreground mt-2">
                  Generate professional reports and manage client communications
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsEmailComposerOpen(true)}
                  iconName="Mail"
                  iconPosition="left"
                >
                  Compose Email
                </Button>
                <Button
                  variant="default"
                  onClick={() => setIsReportBuilderOpen(true)}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Generate Report
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Reports Generated
                    </p>
                    <p className="text-2xl font-semibold text-foreground">
                      247
                    </p>
                    <p className="text-xs text-success">+12% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={24} className="text-success" />
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Emails Sent</p>
                    <p className="text-2xl font-semibold text-foreground">
                      1,432
                    </p>
                    <p className="text-xs text-success">+8% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Active Schedules
                    </p>
                    <p className="text-2xl font-semibold text-foreground">18</p>
                    <p className="text-xs text-muted-foreground">
                      3 running today
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={24} className="text-accent" />
                  </div>
                </div>
              </div>

              <div className="metric-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Client Engagement
                    </p>
                    <p className="text-2xl font-semibold text-foreground">
                      94%
                    </p>
                    <p className="text-xs text-success">+2% this month</p>
                  </div>
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={24} className="text-warning" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Navigation Tabs */}
                <div className="flex items-center space-x-1 mb-6 bg-muted/30 p-1 rounded-lg">
                  {reportTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Templates Tab */}
                {activeTab === "templates" && (
                  <div className="space-y-6">
                    {/* Search and Filters */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Input
                          placeholder="Search templates..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Select
                        options={categoryOptions}
                        value={selectedCategory}
                        onChange={setSelectedCategory}
                        className="w-64"
                      />
                    </div>

                    {/* Templates Grid */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {filteredTemplates.map((template) => (
                        <ReportTemplateCard
                          key={template.id}
                          template={template}
                          onSelect={handleTemplateSelect}
                          onPreview={handleTemplatePreview}
                          onCustomize={handleTemplateCustomize}
                        />
                      ))}
                    </div>

                    {filteredTemplates.length === 0 && (
                      <div className="text-center py-12">
                        <Icon
                          name="FileText"
                          size={48}
                          className="text-muted-foreground mx-auto mb-4"
                        />
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          No templates found
                        </h3>
                        <p className="text-muted-foreground">
                          Try adjusting your search or category filter
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Scheduled Tab */}
                {activeTab === "scheduled" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-foreground">
                        Scheduled Reports
                      </h2>
                      <Button
                        variant="outline"
                        iconName="Plus"
                        iconPosition="left"
                      >
                        New Schedule
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {scheduledReports.map((report) => (
                        <ScheduledReportItem
                          key={report.id}
                          report={report}
                          onEdit={handleScheduledReportEdit}
                          onPause={handleScheduledReportPause}
                          onDelete={handleScheduledReportDelete}
                          onViewHistory={handleScheduledReportHistory}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Library Tab */}
                {activeTab === "library" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-foreground">
                        Report Library
                      </h2>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" iconName="Upload">
                          Import
                        </Button>
                        <Button variant="outline" size="sm" iconName="Download">
                          Export All
                        </Button>
                      </div>
                    </div>

                    <ReportLibrary
                      reports={generatedReports}
                      onDownload={handleReportDownload}
                      onDelete={handleReportDelete}
                      onDuplicate={handleReportDuplicate}
                      onShare={handleReportShare}
                    />
                  </div>
                )}

                {/* Distribution Tab */}
                {activeTab === "distribution" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-foreground">
                        Distribution Management
                      </h2>
                    </div>

                    <DistributionList
                      lists={distributionLists}
                      onCreateList={handleCreateDistributionList}
                      onEditList={handleEditDistributionList}
                      onDeleteList={handleDeleteDistributionList}
                    />
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <ActivityFeed activities={recentActivities} />
              </div>
            </div>
          </div>
        </main>

        {/* Modals */}
        <ReportBuilder
          isOpen={isReportBuilderOpen}
          onClose={() => {
            setIsReportBuilderOpen(false);
            setSelectedTemplate(null);
          }}
          template={selectedTemplate}
          onSave={handleReportSave}
        />

        <EmailComposer
          isOpen={isEmailComposerOpen}
          onClose={() => setIsEmailComposerOpen(false)}
          onSend={handleEmailSend}
        />
      </div>
    </>
  );
};

export default ReportsClientCommunication;
