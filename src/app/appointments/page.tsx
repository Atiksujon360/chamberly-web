'use client'

import { useState } from 'react'
import AppShell from '@/components/layout/AppShell'
import Card, { CardBody } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import AppointmentStatusBadge from '@/components/dashboard/AppointmentStatusBadge'
import {
  allAppointments,
  chambers,
  formatDate,
  getRelativeDateString,
} from '@/lib/dashboard-data'
import { useAccount } from '@/lib/account-context'

type StatusFilter = 'all' | 'upcoming' | 'checked-in' | 'completed' | 'cancelled'
type ViewMode = 'list' | 'queue'
type AppointmentFormMode = 'create' | 'edit'

interface AppointmentFormData {
  patientName: string
  date: string
  time: string
  chamberId: string
  type: string
  notes: string
}

export default function AppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [appointments, setAppointments] = useState(allAppointments);
  const { activeChamberId, setActiveChamberId } = useAccount();

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<AppointmentFormMode>("create");
  const [editingAppointmentId, setEditingAppointmentId] = useState<
    string | null
  >(null);
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: "",
    date: new Date().toISOString().split("T")[0],
    time: "09:00",
    chamberId: activeChamberId || chambers[0]?.id || "",
    type: "Follow-up",
    notes: "",
  });

  // Success/error message state
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Use derived value instead of syncing state
  const localChamberFilter = activeChamberId || "all";

  // Update global active chamber when local filter changes
  const handleChamberFilterChange = (value: string) => {
    setActiveChamberId(value === "all" ? null : value);
  };

  // Generate serial number for a new appointment (demo-level logic)
  const generateSerialNumber = (chamberId: string, date: string): number => {
    const chamberAppointments = appointments.filter(
      (apt) => apt.chamberId === chamberId && apt.date === date,
    );
    const maxSerial = chamberAppointments.reduce(
      (max, apt) => Math.max(max, apt.serialNumber || 0),
      0,
    );
    return maxSerial + 1;
  };

  // Open create modal
  const openCreateModal = () => {
    setModalMode("create");
    setEditingAppointmentId(null);
    setFormData({
      patientName: "",
      date: selectedDateString,
      time: "09:00",
      chamberId: activeChamberId || chambers[0]?.id || "",
      type: "Follow-up",
      notes: "",
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (appointmentId: string) => {
    const appointment = appointments.find((apt) => apt.id === appointmentId);
    if (appointment) {
      setModalMode("edit");
      setEditingAppointmentId(appointmentId);
      setFormData({
        patientName: appointment.patientName,
        date: appointment.date,
        time: appointment.time,
        chamberId: appointment.chamberId,
        type: appointment.type,
        notes: appointment.notes || "",
      });
      setFormErrors({});
      setIsModalOpen(true);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMode("create");
    setEditingAppointmentId(null);
    setFormData({
      patientName: "",
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      chamberId: activeChamberId || chambers[0]?.id || "",
      type: "Follow-up",
      notes: "",
    });
    setFormErrors({});
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      errors.patientName = "Patient name is required";
    }

    if (!formData.date) {
      errors.date = "Date is required";
    }

    if (!formData.time) {
      errors.time = "Time is required";
    }

    if (!formData.chamberId) {
      errors.chamberId = "Chamber is required";
    }

    if (!formData.type) {
      errors.type = "Appointment type is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Create appointment
  const handleCreateAppointment = () => {
    if (!validateForm()) return;

    const newAppointment = {
      id: `apt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      patientName: formData.patientName.trim(),
      date: formData.date,
      time: formData.time,
      chamberId: formData.chamberId,
      type: formData.type,
      notes: formData.notes.trim(),
      status: "upcoming" as const,
      serialNumber: generateSerialNumber(formData.chamberId, formData.date),
    };

    setAppointments((prev) => [...prev, newAppointment]);
    closeModal();
    setSuccessMessage("Appointment created successfully");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Update appointment
  const handleUpdateAppointment = () => {
    if (!editingAppointmentId || !validateForm()) return;

    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === editingAppointmentId
          ? {
              ...apt,
              patientName: formData.patientName.trim(),
              date: formData.date,
              time: formData.time,
              chamberId: formData.chamberId,
              type: formData.type,
              notes: formData.notes.trim(),
              // Update serial number if chamber or date changed
              serialNumber:
                apt.chamberId !== formData.chamberId ||
                apt.date !== formData.date
                  ? generateSerialNumber(formData.chamberId, formData.date)
                  : apt.serialNumber,
            }
          : apt,
      ),
    );
    closeModal();
    setSuccessMessage("Appointment updated successfully");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Cancel appointment
  const handleCancelAppointment = (appointmentId: string) => {
    setCancelConfirmId(appointmentId);
  };

  const confirmCancelAppointment = () => {
    if (cancelConfirmId) {
      updateAppointmentStatus(cancelConfirmId, "cancelled");
      setCancelConfirmId(null);
      setSuccessMessage("Appointment cancelled successfully");
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  // Handle Escape key to close modals
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      if (isModalOpen) closeModal();
      if (cancelConfirmId) setCancelConfirmId(null);
    }
  };

  // Handle modal overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      if (isModalOpen) closeModal();
      if (cancelConfirmId) setCancelConfirmId(null);
    }
  };

  // Handle form input changes
  const handleFormChange = (
    field: keyof AppointmentFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Navigate to previous/next day
  const navigateDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  // Navigate to today
  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Format selected date for display
  const selectedDateString = selectedDate.toISOString().split("T")[0];

  // Update appointment status
  const updateAppointmentStatus = (
    appointmentId: string,
    newStatus: "upcoming" | "checked-in" | "completed" | "cancelled",
  ) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt,
      ),
    );
    setSuccessMessage(`Appointment marked as ${newStatus}`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // Filter appointments based on selected date, chamber, status, and search
  const filteredAppointments = appointments.filter((apt) => {
    // Date filter
    if (apt.date !== selectedDateString) return false;

    // Chamber filter
    if (localChamberFilter !== "all" && apt.chamberId !== localChamberFilter)
      return false;

    // Status filter
    if (statusFilter !== "all" && apt.status !== statusFilter) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        apt.patientName.toLowerCase().includes(query) ||
        apt.type.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Sort appointments by time
  const sortedAppointments = [...filteredAppointments].sort((a, b) =>
    a.time.localeCompare(b.time),
  );

  // Queue view: only show upcoming and checked-in for today
  const queueAppointments = filteredAppointments
    .filter((apt) => apt.status === "upcoming" || apt.status === "checked-in")
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 3);

  // Clear all filters
  const clearFilters = () => {
    setActiveChamberId(null);
    setStatusFilter("all");
    setSearchQuery("");
  };

  const hasActiveFilters =
    localChamberFilter !== "all" ||
    statusFilter !== "all" ||
    searchQuery !== "";

  return (
    <AppShell>
      <div className="space-y-6" onKeyDown={handleKeyDown}>
        {/* Success Message */}
        {successMessage && (
          <div className="p-3 bg-success-light border border-success rounded-lg">
            <p className="text-sm text-success" role="status">
              {successMessage}
            </p>
          </div>
        )}
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">
              Appointments
            </h1>
            <p className="mt-1 text-text-secondary">
              {getRelativeDateString(selectedDateString)} •{" "}
              {sortedAppointments.length} appointments
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="primary" size="sm" onClick={openCreateModal}>
              New Appointment
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              disabled={
                selectedDateString === new Date().toISOString().split("T")[0]
              }
            >
              Today
            </Button>
            <Button
              variant={viewMode === "queue" ? "primary" : "outline"}
              size="sm"
              onClick={() =>
                setViewMode(viewMode === "list" ? "queue" : "list")
              }
            >
              {viewMode === "list" ? "Queue View" : "List View"}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardBody className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Date Navigation */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate(-1)}
                  aria-label="Previous day"
                >
                  ←
                </Button>
                <span className="text-sm font-medium text-text-primary min-w-35 text-center">
                  {formatDate(selectedDateString)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate(1)}
                  aria-label="Next day"
                >
                  →
                </Button>
              </div>

              {/* Chamber Filter */}
              <div className="flex-1">
                <select
                  value={localChamberFilter}
                  onChange={(e) => handleChamberFilterChange(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                  aria-label="Filter by chamber"
                >
                  <option value="all">All Chambers</option>
                  {chambers.map((chamber) => (
                    <option key={chamber.id} value={chamber.id}>
                      {chamber.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter (only in list view) */}
              {viewMode === "list" && (
                <div className="flex-1">
                  <select
                    value={statusFilter}
                    onChange={(e) =>
                      setStatusFilter(e.target.value as StatusFilter)
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="Filter by status"
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="checked-in">Checked In</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              )}

              {/* Search (only in list view) */}
              {viewMode === "list" && (
                <div className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search patient name or type..."
                    className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                    aria-label="Search appointments"
                  />
                </div>
              )}

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Queue View */}
        {viewMode === "queue" && (
          <>
            {queueAppointments.length === 0 ? (
              <Card>
                <CardBody className="p-12 text-center">
                  <p className="text-text-secondary mb-2">
                    No patients in queue
                  </p>
                  <p className="text-xs text-text-tertiary">
                    Queue shows upcoming and checked-in patients for today
                    {localChamberFilter !== "all" &&
                      ` in ${chambers.find((c) => c.id === localChamberFilter)?.name}`}
                  </p>
                </CardBody>
              </Card>
            ) : (
              <Card>
                <CardBody className="p-0">
                  <div className="divide-y divide-border">
                    {queueAppointments.map((appointment, index) => {
                      const chamber = chambers.find(
                        (c) => c.id === appointment.chamberId,
                      );
                      return (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-4 hover:bg-surface-alt transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text-primary">
                                {appointment.patientName}
                              </p>
                              <p className="text-xs text-text-secondary">
                                {appointment.type}
                                {chamber && ` • ${chamber.name}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-text-tertiary">
                              {appointment.time}
                            </span>
                            <AppointmentStatusBadge
                              status={appointment.status}
                            />
                            {appointment.status === "upcoming" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    updateAppointmentStatus(
                                      appointment.id,
                                      "checked-in",
                                    )
                                  }
                                >
                                  Check In
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditModal(appointment.id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditModal(appointment.id)}
                                >
                                  Reschedule
                                </Button>
                              </>
                            )}
                            {appointment.status === "checked-in" && (
                              <>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() =>
                                    updateAppointmentStatus(
                                      appointment.id,
                                      "completed",
                                    )
                                  }
                                >
                                  Complete
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditModal(appointment.id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditModal(appointment.id)}
                                >
                                  Reschedule
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            )}
          </>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <>
            {sortedAppointments.length === 0 ? (
              <Card>
                <CardBody className="p-12 text-center">
                  <p className="text-text-secondary mb-2">
                    No appointments found
                  </p>
                  {hasActiveFilters && (
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )}
                </CardBody>
              </Card>
            ) : (
              <Card>
                <CardBody className="p-0">
                  <div className="divide-y divide-border">
                    {sortedAppointments.map((appointment) => {
                      const chamber = chambers.find(
                        (c) => c.id === appointment.chamberId,
                      );
                      return (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-4 hover:bg-surface-alt transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-16 text-sm font-medium text-text-primary">
                              {appointment.time}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-text-primary">
                                {appointment.patientName}
                              </p>
                              <p className="text-xs text-text-secondary">
                                {appointment.type}
                                {chamber && ` • ${chamber.name}`}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <AppointmentStatusBadge
                              status={appointment.status}
                            />
                            {appointment.status === "upcoming" && (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    updateAppointmentStatus(
                                      appointment.id,
                                      "checked-in",
                                    )
                                  }
                                >
                                  Check In
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditModal(appointment.id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditModal(appointment.id)}
                                >
                                  Reschedule
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleCancelAppointment(appointment.id)
                                  }
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {appointment.status === "checked-in" && (
                              <>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() =>
                                    updateAppointmentStatus(
                                      appointment.id,
                                      "completed",
                                    )
                                  }
                                >
                                  Complete
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditModal(appointment.id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => openEditModal(appointment.id)}
                                >
                                  Reschedule
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleCancelAppointment(appointment.id)
                                  }
                                >
                                  Cancel
                                </Button>
                              </>
                            )}
                            {appointment.status === "completed" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditModal(appointment.id)}
                              >
                                Edit
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            )}
          </>
        )}

        {/* Appointment Form Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={handleOverlayClick}
          >
            <Card className="w-full max-w-md mx-4">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-text-primary">
                    {modalMode === "create"
                      ? "New Appointment"
                      : "Edit Appointment"}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeModal}
                    aria-label="Close modal"
                  >
                    ✕
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Patient Name */}
                  <div>
                    <label
                      htmlFor="patientName"
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      Patient Name *
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      value={formData.patientName}
                      onChange={(e) =>
                        handleFormChange("patientName", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                        formErrors.patientName
                          ? "border-error"
                          : "border-border"
                      }`}
                      aria-invalid={!!formErrors.patientName}
                      aria-describedby={
                        formErrors.patientName ? "patientName-error" : undefined
                      }
                    />
                    {formErrors.patientName && (
                      <p
                        id="patientName-error"
                        className="text-xs text-error mt-1"
                      >
                        {formErrors.patientName}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={formData.date}
                      onChange={(e) => handleFormChange("date", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                        formErrors.date ? "border-error" : "border-border"
                      }`}
                      aria-invalid={!!formErrors.date}
                      aria-describedby={
                        formErrors.date ? "date-error" : undefined
                      }
                    />
                    {formErrors.date && (
                      <p id="date-error" className="text-xs text-error mt-1">
                        {formErrors.date}
                      </p>
                    )}
                  </div>

                  {/* Time */}
                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      Time *
                    </label>
                    <input
                      type="time"
                      id="time"
                      value={formData.time}
                      onChange={(e) => handleFormChange("time", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                        formErrors.time ? "border-error" : "border-border"
                      }`}
                      aria-invalid={!!formErrors.time}
                      aria-describedby={
                        formErrors.time ? "time-error" : undefined
                      }
                    />
                    {formErrors.time && (
                      <p id="time-error" className="text-xs text-error mt-1">
                        {formErrors.time}
                      </p>
                    )}
                  </div>

                  {/* Chamber */}
                  <div>
                    <label
                      htmlFor="chamber"
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      Chamber *
                    </label>
                    <select
                      id="chamber"
                      value={formData.chamberId}
                      onChange={(e) =>
                        handleFormChange("chamberId", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                        formErrors.chamberId ? "border-error" : "border-border"
                      }`}
                      aria-invalid={!!formErrors.chamberId}
                      aria-describedby={
                        formErrors.chamberId ? "chamber-error" : undefined
                      }
                    >
                      {chambers.map((chamber) => (
                        <option key={chamber.id} value={chamber.id}>
                          {chamber.name}
                        </option>
                      ))}
                    </select>
                    {formErrors.chamberId && (
                      <p id="chamber-error" className="text-xs text-error mt-1">
                        {formErrors.chamberId}
                      </p>
                    )}
                    {/* Display fee for selected chamber */}
                    {formData.chamberId && (
                      <p className="text-xs text-text-tertiary mt-1">
                        Fee:{" "}
                        {chambers.find((c) => c.id === formData.chamberId)
                          ?.feeNew || "N/A"}{" "}
                        (New),{" "}
                        {chambers.find((c) => c.id === formData.chamberId)
                          ?.feeFollowUp || "N/A"}{" "}
                        (Follow-up)
                      </p>
                    )}
                  </div>

                  {/* Type */}
                  <div>
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      Appointment Type *
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => handleFormChange("type", e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                        formErrors.type ? "border-error" : "border-border"
                      }`}
                      aria-invalid={!!formErrors.type}
                      aria-describedby={
                        formErrors.type ? "type-error" : undefined
                      }
                    >
                      <option value="Follow-up">Follow-up</option>
                      <option value="New Consultation">New Consultation</option>
                      <option value="Check-up">Check-up</option>
                    </select>
                    {formErrors.type && (
                      <p id="type-error" className="text-xs text-error mt-1">
                        {formErrors.type}
                      </p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium text-text-primary mb-1"
                    >
                      Notes (Optional)
                    </label>
                    <textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        handleFormChange("notes", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm text-text-primary bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background resize-none"
                      placeholder="Add any notes for this appointment..."
                    />
                  </div>

                  {/* Serial Number Preview (edit mode) */}
                  {modalMode === "edit" && editingAppointmentId && (
                    <div className="p-3 bg-surface-alt border border-border rounded-lg">
                      <p className="text-xs text-text-tertiary">
                        Serial Number:{" "}
                        {
                          appointments.find(
                            (apt) => apt.id === editingAppointmentId,
                          )?.serialNumber
                        }
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      size="md"
                      onClick={closeModal}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={
                        modalMode === "create"
                          ? handleCreateAppointment
                          : handleUpdateAppointment
                      }
                      className="flex-1"
                    >
                      {modalMode === "create"
                        ? "Create Appointment"
                        : "Update Appointment"}
                    </Button>
                  </div>

                  {/* Demo Notice */}
                  <p className="text-xs text-text-tertiary mt-4">
                    * This form creates demonstration appointments only. Changes
                    do not persist after refresh.
                  </p>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {cancelConfirmId && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={handleOverlayClick}
          >
            <Card className="w-full max-w-sm mx-4">
              <CardBody className="p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-2">
                  Cancel Appointment
                </h2>
                <p className="text-sm text-text-secondary mb-6">
                  Are you sure you want to cancel this appointment? This action
                  cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setCancelConfirmId(null)}
                    className="flex-1"
                  >
                    No, Keep It
                  </Button>
                  <Button
                    variant="error"
                    size="md"
                    onClick={confirmCancelAppointment}
                    className="flex-1"
                  >
                    Yes, Cancel
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )}

        {/* Demo Data Notice */}
        <Card>
          <CardBody className="p-4">
            <p className="text-xs text-text-tertiary">
              * This page displays demonstration data only. Status changes do
              not persist after refresh. Appointment creation, editing, and
              deletion require backend integration. Queue positions and serial
              numbers are for demonstration only.
            </p>
          </CardBody>
        </Card>
      </div>
    </AppShell>
  );
}
