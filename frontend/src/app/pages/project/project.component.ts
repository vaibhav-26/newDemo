import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Project } from "src/app/core/models/project/project.interface";
import { RemoveProject } from "src/app/core/models/project/project.response";
import { ProjectService } from "src/app/core/services/project/project.service";
import { itemsPerPage } from "src/app/utils/constants/constants";
import Swal from "sweetalert2";
import { AddProjectComponent } from "./add-project/add-project.component";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent {
  displayedColumns: string[] = ["name", "isActive", "action"];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Project>();
  pageSizes = itemsPerPage.PageSize;
  pageSize: number;
  totalData: number;
  pageIndex: number;
  ProjectData: Project[];
  searchKeyword: string = "";

  animal: string;
  name: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(AddProjectComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      this.animal = result;
    });
  }

  constructor(
    public projectService: ProjectService,
    public dialog: MatDialog
  ) {}

  getTableData(pageNumber: Number, pageSize: Number, searchKey: String) {
    return this.projectService.getProjects(pageNumber, pageSize, searchKey);
  }

  ngAfterViewInit() {
    this.fetchProjects(this.searchKeyword);
  }

  filterProject(event: Event) {
    this.searchKeyword = (event.target as HTMLInputElement).value;
    this.fetchProjects(this.searchKeyword);
  }

  getServerData(event: any) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchProjects(this.searchKeyword);
  }

  fetchProjects(searchKey: String) {
    this.dataSource.paginator = this.paginator;
    this.getTableData(
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      searchKey
    ).subscribe((data: any) => {
      this.dataSource = data?.data;
      this.pageIndex = data?.metadata[0]?.page - 1;
      this.pageSize = data?.metadata[0]?.per_page;
      this.totalData = data?.metadata[0]?.total;
    });
  }

  removeProject(product: Project) {
    Swal.fire({
      title: "Are you sure want to remove?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.value) {
        this.projectService
          .removeProject(product._id)
          .subscribe((data: any) => {
            Swal.fire("Deleted!", data.meta.msg, "success").then(() => {
              this.fetchProjects(this.searchKeyword);
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your project data is safe :)", "error");
      }
    });
  }
}
