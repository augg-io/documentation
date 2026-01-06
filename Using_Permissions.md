---
layout: default
title: Using Permissions
nav_order: 3
parent: CMS
permalink: /cms/using_permissions/
---

# **Using Permissions**

**Permissions** allow you to define access levels for accounts invited to your Organization. By assigning specific permissions, you can control exactly what actions a user can perform within your environment.

## **Permissions Tables**

The following tables contain every available permission along with a description of the actions they authorize.

### **Organization Permissions**

These permissions apply across the entire organization and generally govern administrative settings, billing, and high-level resource management.

#### **Organization**
| Permission | Description |
| -------- | ------- |
| organization.billing.manage | Allows user to manage billing of the organization |
| organization.delete | Allows user to delete the organization |
| organization.update | Allows user to update the organization information |
| organization.billing.read | Allows user to open the billing page |
| organization.service_account.manage | Allows user to upload service account to the organization |

#### **Organization Membership**
| Permission | Description |
| -------- | ------- |
| organization.membership.grant | Allows user to grant organization entity membership to accounts (e.g., templates) |
| organization.membership.groups.delete | Allows user to delete membership groups |
| organization.membership.groups.update | Allows user to update membership groups |
| organization.membership.read | Allows user to see who has organization entity membership |
| organization.override_membership | Gives user access to all content in the organization |
| organization.membership.groups.create | Allows user to create membership groups |
| organization.membership.groups.list | Allows user to see existing membership groups |
| organization.membership.groups.update_user | Allows user to update users membership groups |
| organization.membership.revoke | Allows user to remove organization entity memberships |

#### **Organization Roles**
| Permission | Description |
| -------- | ------- |
| organization.roles.create | Allows user to create organization roles |
| organization.roles.list | Allows user to see existing organization roles |
| organization.roles.delete | Allows user to delete organization roles |
| organization.roles.update | Allows user to update permissions in organization roles |

#### **Organization Members**
| Permission | Description |
| -------- | ------- |
| organization.users.add | Allows user to invite users to organization |
| organization.users.remove | Allows user to remove members from organization |
| organization.users.list | Allows user to see existing organization members |
| organization.users.update_roles | Allows user to update any users roles |

#### **Workspaces**
| Permission | Description |
| -------- | ------- |
| organization.override_workspace_permissions | Gives user all workspace level permissions |
| organization.workspaces.delete | Allows user to delete workspaces |
| organization.workspaces.update | Allows user to update workspaces information |
| organization.workspaces.create | Allows user to create new workspaces |
| organization.workspaces.read | Allows user to see existing workspaces |

#### **Solutions**
| Permission | Description |
| -------- | ------- |
| solution.create_template | Allows user to create templates from solutions |
| solution.read | Allows user to see existing solutions information |
| solution.list | Allows user to see existing solutions |

#### **Storage**
| Permission | Description |
| -------- | ------- |
| organization.storage.read | Allows user to access stored information (e.g., saved scan mesh) |
| organization.storage.write | Allows user to upload data to the storage (e.g., uploading scan mesh) |

#### **Templates**
| Permission | Description |
| -------- | ------- |
| template.create_application | Allows user to create applications from templates |
| template.default_data.update | Allows user to update templates default data |
| template.update | Allows user to update templates information |
| template.create_from_application | Allows user to create templates from applications |
| template.delete | Allows user to delete templates |

### **Workspace Permissions**

These permissions work on workspace level, mainly on the actual content like locations and experiences.

#### **Anchors**
| Permission | Description |
| -------- | ------- |
| anchor.create | Allows user to create anchors |
| anchor.update | Allows user to update anchors information |
| anchor.delete | Allows user to delete anchors |

#### **Application Modules**
| Permission | Description |
| -------- | ------- |
| application.module.create | Allows user to create application modules |
| application.module.list | Allows user to see existing application modules |
| application.module.delete | Allows user to delete application modules |
| application.module.update | Allows user to update application modules information |

#### **Applications**
| Permission | Description |
| -------- | ------- |
| application.create | Allows user to create applications |
| application.token.read | Allows user to download application tokens |
| application.delete | Allows user to delete applications |
| application.update | Allows user to update applications information |

#### **Collections**
| Permission | Description |
| -------- | ------- |
| collection.create | Allows user to create collections |
| collection.list | Allows user to see existing collections |
| collection.rows.delete | Allows user to delete collection rows |
| collection.schema.update | Allows user to update collection schemas |
| collection.delete | Allows user to delete collections |
| collection.rows.add | Allows user to add collection rows |
| collection.rows.update | Allows user to update collection rows information |
| collection.update | Allows user to update collection information |

#### **Experiences**
| Permission | Description |
| -------- | ------- |
| experience.create | Allows user to create experiences |
| experience.locations.set | Allows user to manage assigned locations in experiences |
| experience.update | Allows user to update experience information |
| experience.delete | Allows user to delete experiences |
| experience.objects.reassign | Allows user to reassign experience objects |

#### **Locations**
| Permission | Description |
| -------- | ------- |
| location.create | Allows user to create locations |
| location.review | Allows user to review locations |
| location.update | Allows user to update locations information |
| location.delete | Allows user to delete locations |
| location.review.clear | Allows user to clear location reviews |

#### **Tags**
| Permission | Description |
| -------- | ------- |
| tag.create | Allows user to create tags |
| tag.update | Allows user to update tags information |
| tag.delete | Allows user to delete tags |

#### **Workspace Membership**
| Permission | Description |
| -------- | ------- |
| workspace.membership.grant | Allows user to grant workspace entity membership |
| workspace.membership.revoke | Allows user to remove users workspace entity membership |
| workspace.membership.read | Allows user to see workspace entity membership |

#### **Workspace Roles**
| Permission | Description |
| -------- | ------- |
| workspace.roles.create | Allows user to create workspace roles |
| workspace.roles.list | Allows user to see existing workspace roles |
| workspace.roles.delete | Allows user to delete workspace roles |
| workspace.roles.update | Allows user to update workspace roles |

#### **Workspace Members**
| Permission | Description |
| -------- | ------- |
| workspace.users.add | Allows user to add user to workspaces |
| workspace.users.remove | Allows user to remove users from workspaces |
| workspace.users.list | Allows user to see existing users in workspaces |
| workspace.users.update_roles | Allows user to update workspace members roles |

### **Special Override Permissions**
Exercise caution when assigning the following permissions. They provide elevated access that can bypass standard restrictions.

#### **organization.override_membership**
Gives user access to all content in the organization, the access cannot be limited.

#### **organization.override_workspace_permissions**
Gives user all workspace level permissions.

### **Other Powerful Permissions**
These permissions allow the user to change their own permissions, therefore allowing users with these permissions to give themselves access to everything.

#### **organization.roles.update**
Allows user with this permission to modify their own (or others) role to include any other permission, effectively granting themselves full access. 

#### **organization.users.update_roles**
Allows user to assign themselves (or others) highly privileged roles, such as "Organization Owner."