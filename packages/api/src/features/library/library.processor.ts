import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BehaviorSubject } from 'rxjs';
export interface LibraryProcessorJob {
  id: number;
  data: any;
  status: LibraryProcessorStatus;
  type: LibraryProcessorType;
}
export enum LibraryProcessorStatus {
  PENDING,
  RUNNING,
  COMPLETED,
  ERROR,
}
export enum LibraryProcessorType {
  SYNC,
}
export class LibraryProcessor {
  private readonly logger = new Logger(LibraryProcessor.name);

  public jobList: BehaviorSubject<LibraryProcessorJob[]> = new BehaviorSubject(
    [],
  );
  private runningJobs: LibraryProcessorJob[] = [];

  @Cron('15 * * * * *')
  async checkProcessQueueJobs() {
    this.logger.debug('Check jobs...');
    const currentList = this.jobList.getValue();
    if (currentList.length > 0) {
      currentList.forEach((job) => {
        this.processJob(job);
      });
    }
  }

  async add(jobData: unknown) {
    const jobList = [...this.jobList.getValue()];
    const jobFormatted = {
      data: jobData,
      type: LibraryProcessorType.SYNC,
      status: LibraryProcessorStatus.PENDING,
      id: jobList.length + 1,
    };
    jobList.push(jobFormatted);
    this.jobList.next(jobList);
  }

  async remove(jobId: number) {
    const jobList = [...this.jobList.getValue()];
    const jobIndex = jobList.findIndex((job) => job.id === jobId);
    if (jobIndex > -1) {
      jobList.splice(jobIndex, 1);
      this.jobList.next(jobList);
    }
  }

  async update(jobId: number, status: LibraryProcessorStatus) {
    const jobList = [...this.jobList.getValue()];
    const jobIndex = jobList.findIndex((job) => job.id === jobId);
    if (jobIndex > -1) {
      jobList[jobIndex].status = status;
      this.jobList.next(jobList);
    }
  }

  async getJobs() {
    return this.jobList.getValue();
  }

  async syncFolder(job: LibraryProcessorJob) {
    this.logger.debug(`Sync Folder... ID:${job.id}`);
    this.update(job.id, LibraryProcessorStatus.RUNNING);
  }

  async onProgress(job: any) {
    console.log(job);
  }

  private processJob(job: LibraryProcessorJob) {
    if (job.status === LibraryProcessorStatus.PENDING) {
      this.logger.debug(`Processing job... ID:${job.id}`);
      switch (job.type) {
        case LibraryProcessorType.SYNC:
          this.syncFolder(job);
          break;
        default:
          break;
      }
    }
  }
}
