import React, { useState, useEffect, use } from 'react'
import { toast } from "react-toastify";
import ComplianceList from './ComplianceList.jsx'
import SummaryCards from './SummaryCards.jsx'
import { getComplianceSummary, getAllComplianceRecords,officerUpdateCompliance } from "../../api/complianceAPI.js";
import ComplianceFilter from './ComplianceFilter.jsx';
import ComplianceCard from './ComplianceCard.jsx';
import ComplianceCardModal from './ComplianceModal.jsx';
import { useAuth } from '../../context/AuthContext.jsx';


const ComplianceDashboard = () => {
  const { user } = useAuth();
  const[complianceRecords, setComplianceRecords] = useState([])
   const [summary, setSummary] = useState({
      totalRecords: 0,
      byResult: {},
      byType: {},
    });
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(null)
  const [filteredRecords, setFilteredRecords] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [dateFrom, setDateFrom] = useState('')
   const [dateTo, setDateTo] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
   const [selectedRecord, setSelectedRecord] = useState(null)


  useEffect(() => {
    fetchComplianceRecords();
    fetchSummary();
  }, []);

  const fetchComplianceRecords = async () => {
    try {
      setLoading(true);
      const res = await getAllComplianceRecords()
      console.log("Fetched compliance records:", res.data);
      setComplianceRecords(res.data);
    } catch (err) {
      console.error("Error fetching compliance records", err);
    } finally {
      setLoading(false);
    }
  };

const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await getComplianceSummary()
      console.log("Fetched compliance summary:", res.data);
      setSummary(res.data);
    } catch (error) {
      console.error("Failed to fetch compliance summary", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
  const term = searchTerm.trim().toLowerCase();

  const filtered = complianceRecords.filter((record) => {
    const matchesSearch =
      term === "" ||
      record.complianceId.toString().includes(term) ||
      record.type.toLowerCase().includes(term) ||
      record.result.toLowerCase().includes(term) ||
      record.entity?.title?.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "ALL" || record.result === statusFilter;

    const matchesType =
      typeFilter === "ALL" || record.type === typeFilter;

    const recordDate = new Date(record.date + "T00:00:00");
    const from = dateFrom ? new Date(dateFrom + "T00:00:00") : null;
    const to = dateTo ? new Date(dateTo + "T23:59:59") : null;

    const matchesDate =
      (!from || recordDate >= from) &&
      (!to || recordDate <= to);

    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  setFilteredRecords(filtered);
}, [searchTerm, statusFilter, typeFilter, dateFrom, dateTo, complianceRecords]);

  const handleSelectRecord = (record) => {
    setSelectedRecord(record)
    setIsEditing(false)
    setEditData(null)
    setIsModalOpen(true)
  }

  const handleSaveCompliance = async (editData, record) => {
  try {
    await officerUpdateCompliance(record.type, record.entityId, {
      result: editData.result,
      notes: editData.notes,
      officerId: user?.userId,
    });
    toast.success("Compliance updated successfully!");
    await fetchComplianceRecords();
    await fetchSummary();
    setSelectedRecord(null);

  } catch (error) {
    console.error(error);
    toast.error("❌ Failed to update compliance");
  }
};


  return (
  <div className="space-y-6">

    <SummaryCards summary={summary} />
    

   <ComplianceFilter
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  statusFilter={statusFilter}
  setStatusFilter={setStatusFilter}
  typeFilter={typeFilter}
  setTypeFilter={setTypeFilter}
  dateFrom={dateFrom}
  setDateFrom={setDateFrom}
  dateTo={dateTo}
  setDateTo={setDateTo}
  onClear={() => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setTypeFilter("ALL");
    setDateFrom("");
    setDateTo("");
  }}
/>

   
  <ComplianceList
    complianceRecords={filteredRecords}
    handleSelectRecord={handleSelectRecord}
  />


{selectedRecord && (
  <ComplianceCardModal
    summary={summary}
    record={selectedRecord}
    onClose={() => setSelectedRecord(null)}
    onSave={(editData) => handleSaveCompliance(editData, selectedRecord)}
  />
)}
  </div>
)
}

export default ComplianceDashboard
