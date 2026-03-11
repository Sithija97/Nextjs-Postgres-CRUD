import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import type {
  CustomerFormValues,
  CustomerRecord,
  CustomerType,
} from "@/types/customer";

interface CustomerFormDialogProps {
  customer?: CustomerRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: CustomerFormValues) => void;
}

const defaultValues: CustomerFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  country: "",
  customerType: "Individual",
};

const customerTypes: CustomerType[] = [
  "Individual",
  "Business",
  "Enterprise",
  "Partner",
  "Reseller",
  "Other",
];

export function CustomerFormDialog({
  customer,
  open,
  onOpenChange,
  onSave,
}: CustomerFormDialogProps) {
  const [formValues, setFormValues] =
    useState<CustomerFormValues>(defaultValues);

  useEffect(() => {
    if (customer) {
      setFormValues({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
        country: customer.country,
        customerType: customer.customerType,
      });
      return;
    }

    setFormValues(defaultValues);
  }, [customer, open]);

  const isEditMode = Boolean(customer);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave(formValues);
  };

  const updateField = <K extends keyof CustomerFormValues>(
    key: K,
    value: CustomerFormValues[K],
  ) => {
    setFormValues((current) => ({ ...current, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit customer" : "Create customer"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Adjust the customer profile details below."
              : "Add a new customer profile to the dashboard preview."}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                value={formValues.firstName}
                onChange={(event) =>
                  updateField("firstName", event.target.value)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                value={formValues.lastName}
                onChange={(event) =>
                  updateField("lastName", event.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formValues.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone number</Label>
              <Input
                id="phoneNumber"
                value={formValues.phoneNumber}
                onChange={(event) =>
                  updateField("phoneNumber", event.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formValues.address}
                onChange={(event) => updateField("address", event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formValues.country}
                onChange={(event) => updateField("country", event.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerType">Customer type</Label>
            <Select
              id="customerType"
              value={formValues.customerType}
              onChange={(event) =>
                updateField("customerType", event.target.value as CustomerType)
              }
            >
              {customerTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Save changes" : "Create customer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
