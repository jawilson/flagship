import { CampaignType } from '../campaign/campaignType';
import { Team } from '../campaign/team';
import { CampaignState } from '../campaign/campaignState';
import { Phase } from '../campaign/phase';
import { Faction } from '../game/faction';
import { CampaignLocation, SerializedCampaignLocation } from '../campaign/campaignLocation';
import { StrategicEffectType } from '../campaign/strategicEffectType';
import { SerializedCustomCommander } from '../campaign/customCommander';
import { Campaign } from '../campaign/campaign';
import { CampaignLocationFactory } from './campaignLocationFactory';
import { CampaignEra } from '../campaign/campaignEra';

export class CampaignFactory {

    public createCampaign(name: string, type: CampaignType, era: CampaignEra, owner: firebase.User) {
        let campaign = new Campaign();
        campaign.id = null;
        campaign.inviteToken = null;
        campaign.name = name;
        campaign.type = type;
        campaign.era = era;
        campaign.ownerUid = owner.uid;
        campaign.campaignUsers = [{
            uid: campaign.ownerUid,
            displayName: owner.displayName,
            photoURL: owner.photoURL
          }];
        campaign.playerUids = [owner.uid];
        campaign.empire = new Team();
        campaign.empire.faction = era === CampaignEra.CivilWar ? Faction.Empire : Faction.Separatists;
        campaign.empire.name = era === CampaignEra.CivilWar ? 'Galactic Empire' : 'Separatist Alliance';
        campaign.rebels = new Team();
        campaign.rebels.faction = era === CampaignEra.CivilWar ? Faction.Rebels : Faction.Republic;
        campaign.rebels.name = era === CampaignEra.CivilWar ? 'Rebel Alliance' : 'Galactic Republic';
        let now = new Date();
        campaign.startDate = now;
        campaign.statusDate = now;
        let initialState = new CampaignState();
        initialState.act = 0;
        initialState.turn = 0;
        initialState.phase = Phase.CampaignSetup;
        initialState.initiativeFaction = campaign.rebels.faction;
        initialState.events = [];
        campaign.history = [initialState];
        let factory = new CampaignLocationFactory();
        campaign.locations = factory.createCampaignLocations(campaign.type, []);
        return campaign;
    }


}
