import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BehaviorSubject } from 'rxjs';
export interface LibraryProcessorJob {
  id: number;
  data: any;
}
export class LibraryProcessor {
  private readonly logger = new Logger(LibraryProcessor.name);

  public jobList = new BehaviorSubject([]);
  private runningJobs = [];

  @Cron('15 * * * * *')
  async processJobs() {
    this.logger.debug('Start processing jobs...');
    const currentList = this.jobList.getValue();
    if (currentList.length > 0) {
    }
  }

  async add(job: any) {
    const jobList = [...this.jobList.getValue()];
    const jobFormatted = { ...job, id: jobList.length + 1 };
    jobList.push(jobFormatted);
    this.jobList.next(jobList);
  }
  async getJobs() {
    return [];
  }

  async syncFolder() {
    this.logger.debug('Start syncFolder...');
  }

  async onProgress(job: any) {
    console.log(job);
  }
}
