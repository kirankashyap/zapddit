import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Community } from 'src/app/model/community';
import { NdkproviderService } from 'src/app/service/ndkprovider.service';

@Component({
  selector: 'app-community-card',
  templateUrl: './community-card.component.html',
  styleUrls: ['./community-card.component.scss']
})
export class CommunityCardComponent {

  @Input()
  community:Community;

  constructor(private ndkProvider:NdkproviderService, private router:Router){

  }

  ngOnInit(){
    if(!this.community.creatorProfile){
      this.fetchCreatorProfile();
    }
  }

  async fetchCreatorProfile(){
    const profile = await this.ndkProvider.getProfileFromHex(this.community.creatorHexKey!);
    if(profile){
      this.community.creatorProfile = profile;
    }
  } 
  
  openCommunityPage(){
      this.router.navigateByUrl('n/'+this.community.name+'/'+this.community.creatorHexKey)   
  }

  openCommunityCreatorInSnort(){
    window.open('https://snort.social/e/'+this.community.creatorHexKey!,'_blank')
  }
}