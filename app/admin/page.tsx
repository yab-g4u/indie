"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AdminPanel() {
  return (
    <main className="p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="onboarding">Farm Onboarding</TabsTrigger>
          <TabsTrigger value="settings">Crop & Action Types</TabsTrigger>
          <TabsTrigger value="catalog">Rewards Catalog</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardContent className="p-4">
              <div className="grid sm:grid-cols-3 gap-3">
                <Input placeholder="Name" />
                <Input placeholder="Email" />
                <Button className="bg-[color:#0B6A46]">Invite</Button>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">Manage roles and access.</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="onboarding">
          <Card>
            <CardContent className="p-4">
              <form className="grid md:grid-cols-2 gap-3">
                <div>
                  <Label>Farm name</Label>
                  <Input placeholder="Farm A" />
                </div>
                <div>
                  <Label>Zone</Label>
                  <Input placeholder="Oromia" />
                </div>
                <div className="md:col-span-2">
                  <Label>Owner</Label>
                  <Input placeholder="Alemu" />
                </div>
                <div className="md:col-span-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Optional" />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <Button className="bg-[color:#0B6A46]">Generate Digital Card</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="p-4">
              <div className="grid sm:grid-cols-3 gap-3">
                <Input placeholder="Add crop type (e.g., Maize)" />
                <Input placeholder="Add action (e.g., Irrigate)" />
                <Button variant="outline">Save</Button>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">Customize supported crops and actions.</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="catalog">
          <Card>
            <CardContent className="p-4">
              <div className="grid sm:grid-cols-4 gap-3">
                <Input placeholder="Item name" />
                <Input placeholder="Credits" />
                <Input placeholder="SKU" />
                <Button className="bg-[color:#0B6A46]">Add</Button>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">Manage redeemable items.</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
