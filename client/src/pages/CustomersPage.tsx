import { startTransition, useState } from "react";

import { CustomerFormDialog } from "@/components/dashboard/customer-form-dialog";
import { CustomerTable } from "@/components/dashboard/customer-table";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DeleteCustomerDialog } from "@/components/dashboard/delete-customer-dialog";
import { mockCustomers } from "@/data/mock-dashboard";
import type { CustomerFormValues, CustomerRecord } from "@/types/customer";

function createCustomerRecord(
  nextId: number,
  values: CustomerFormValues,
): CustomerRecord {
  return {
    id: nextId,
    ...values,
    dateCreated: new Date().toISOString(),
  };
}

export function CustomersPage() {
  const [customers, setCustomers] = useState(mockCustomers);
  const [editingCustomer, setEditingCustomer] = useState<CustomerRecord | null>(
    null,
  );
  const [deletingCustomer, setDeletingCustomer] =
    useState<CustomerRecord | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleCreate = () => {
    setEditingCustomer(null);
    setFormOpen(true);
  };

  const handleEdit = (customer: CustomerRecord) => {
    setEditingCustomer(customer);
    setFormOpen(true);
  };

  const handleDelete = (customer: CustomerRecord) => {
    setDeletingCustomer(customer);
    setDeleteOpen(true);
  };

  const handleSave = (values: CustomerFormValues) => {
    startTransition(() => {
      setCustomers((current) => {
        if (editingCustomer) {
          return current.map((customer) =>
            customer.id === editingCustomer.id
              ? {
                  ...customer,
                  ...values,
                }
              : customer,
          );
        }

        const nextId =
          current.reduce((maxId, customer) => Math.max(maxId, customer.id), 0) +
          1;
        return [createCustomerRecord(nextId, values), ...current];
      });
    });

    setFormOpen(false);
    setEditingCustomer(null);
  };

  const confirmDelete = () => {
    if (!deletingCustomer) {
      return;
    }

    startTransition(() => {
      setCustomers((current) =>
        current.filter((customer) => customer.id !== deletingCustomer.id),
      );
    });

    setDeleteOpen(false);
    setDeletingCustomer(null);
  };

  return (
    <DashboardLayout>
      <CustomerTable
        customers={customers}
        onAdd={handleCreate}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

      <CustomerFormDialog
        customer={editingCustomer}
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) {
            setEditingCustomer(null);
          }
        }}
        onSave={handleSave}
      />

      <DeleteCustomerDialog
        customer={deletingCustomer}
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);
          if (!open) {
            setDeletingCustomer(null);
          }
        }}
        onConfirm={confirmDelete}
      />
    </DashboardLayout>
  );
}
